import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeScrollEvent, NativeSyntheticEvent, Image } from "react-native";

import PinsBoard, { THRESHOLD_PULL_TO_REFRESH } from "./PinsBoard";

import { AuthenticationContext } from "@/src/contexts/authenticationContext";
import { API_BASE_URL } from "@/src/lib/constants";
import {
  NetworkError,
  Response401Error,
  ResponseKOError,
} from "@/src/lib/customErrors";
import { PinType } from "@/src/lib/types";
import { fetchWithAuthentication } from "@/src/lib/utils/fetch";
import { getPinsWithCamelCaseKeys } from "@/src/lib/utils/serializers";
import { appendQueryParam } from "@/src/lib/utils/strings";

type PinsBoardContainerProps = {
  fetchEndpoint: string;
  shouldAuthenticate?: boolean;
  getTapHandlerForPin: ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: PinType;
    pinImageAspectRatio: number;
  }) => () => void;
};

const MARGIN_SCROLL_BEFORE_NEW_FETCH = 10000; // the margin we leave ourselves
// in terms of remaining scroll before reaching the end of the board.
// This margin will determine when we trigger the fetching of new pins (see below).

const DEBOUNCE_TIME_REFRESH_MS = 1000; // after the user just
// refreshed pins, we wait for this timeout before displaying the refresh spinner
// preview again. Otherwise, there's a weird visual effect if the user continues
// scrolling down further than the refresh threshold.

export const DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS = 500; // this debounce
// is introduced to avoid fetching the two next pages instead of just the next
// page when the user scrolls down.

const PinsBoardContainer = ({
  fetchEndpoint,
  shouldAuthenticate,
  getTapHandlerForPin,
}: PinsBoardContainerProps) => {
  const { t } = useTranslation();

  const { dispatch } = useContext(AuthenticationContext);

  const [pins, setPins] = useState<PinType[]>([]);
  const [pinImageAspectRatios, setPinImageAspectRatios] = useState<
    (number | null)[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMorePins, setIsFetchingMorePins] = useState(false);
  const hasJustFetchedMorePins = useRef(false);
  const [fetchMorePinsError, setFetchMorePinsError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasJustRefreshed, setHasJustRefreshed] = useState(false);
  const [refreshError, setRefreshError] = useState("");

  const onNextPage = async () => {
    setIsFetchingMorePins(true);
    resetAllErrors();

    let nextPinsAndAspectRatios;

    try {
      nextPinsAndAspectRatios = await fetchNextPinsAndImageRatios();
    } catch (error) {
      if (error instanceof Response401Error) {
        dispatch({ type: "GOT_401_RESPONSE" });
        return;
      }

      if (error instanceof NetworkError) {
        setFetchMorePinsError(t("Common.CONNECTION_ERROR"));
        return;
      }

      setFetchMorePinsError(t("Common.ERROR_FETCH_MORE_PINS"));
      return;
    } finally {
      setIsFetchingMorePins(false);
      hasJustFetchedMorePins.current = true;
      setTimeout(() => {
        hasJustFetchedMorePins.current = false;
      }, DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS);
    }

    const { nextPins, nextPinsImageAspectRatios } = nextPinsAndAspectRatios;

    setPins((previousPins) => [...previousPins, ...nextPins]);
    setPinImageAspectRatios((previousAspectRatios) => [
      ...previousAspectRatios,
      ...nextPinsImageAspectRatios,
    ]);
  };

  const onRefresh = async () => {
    setCurrentPage(1);
    setIsRefreshing(true);
    resetAllErrors();

    let firstPinsAndAspectRatios;

    try {
      firstPinsAndAspectRatios = await fetchNextPinsAndImageRatios();
    } catch (error) {
      if (error instanceof Response401Error) {
        dispatch({ type: "GOT_401_RESPONSE" });
        return;
      }

      if (error instanceof NetworkError) {
        setRefreshError(t("Common.CONNECTION_ERROR"));
        return;
      }

      setRefreshError(t("Common.ERROR_REFRESH_PINS"));
      return;
    } finally {
      setIsRefreshing(false);
      setHasJustRefreshed(true);
      setTimeout(() => {
        setHasJustRefreshed(false);
      }, DEBOUNCE_TIME_REFRESH_MS);
    }

    const {
      nextPins: firstPins,
      nextPinsImageAspectRatios: firstPinsImageRatios,
    } = firstPinsAndAspectRatios;

    setPins(firstPins);
    setPinImageAspectRatios(firstPinsImageRatios);
  };

  const fetchNextPinsAndImageRatios = async () => {
    const nextPins = await fetchNextPins();

    const nextPinsImageAspectRatios = await fetchImageRatios({
      pins: nextPins,
    });

    return { nextPins, nextPinsImageAspectRatios };
  };

  const fetchNextPins = async () => {
    const endpointWithPageParameter = appendQueryParam({
      url: fetchEndpoint,
      key: "page",
      value: currentPage.toString(),
    });

    let newPinsResponse;

    try {
      if (shouldAuthenticate) {
        newPinsResponse = await fetchWithAuthentication({
          endpoint: endpointWithPageParameter,
        });
      } else {
        newPinsResponse = await fetch(
          `${API_BASE_URL}/${endpointWithPageParameter}`,
        );
      }
    } catch {
      throw new NetworkError();
    }

    if (newPinsResponse.status === 401) {
      throw new Response401Error();
    }

    if (!newPinsResponse.ok) {
      throw new ResponseKOError();
    }

    const responseData = await newPinsResponse.json();

    return getPinsWithCamelCaseKeys(responseData.results);
  };

  const fetchImageRatios = async ({
    pins,
  }: {
    pins: PinType[];
  }): Promise<(number | null)[]> => {
    const buildGetSizePromiseForPin = (pin: PinType) => {
      return new Promise((resolve, reject) => {
        const imageURL = pin.imageURL;

        if (!imageURL) {
          resolve(null);
          return;
        }

        Image.getSize(
          imageURL,
          (width, height) => {
            const aspectRatio = width / height;
            resolve(aspectRatio);
          },
          (error) => {
            reject(error);
          },
        );
      });
    };

    const aspectRatioPromises = pins.map(buildGetSizePromiseForPin);

    const imageRatios = await Promise.all(aspectRatioPromises);

    return imageRatios as (number | null)[];
  };

  const resetAllErrors = () => {
    setFetchMorePinsError("");
    setRefreshError("");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < 0) {
      handlePullEvent(event);
    } else if (offsetY > 0) {
      handleScrollContentEvent(event);
    }
  };

  const handlePullEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const crossesRefreshThreshold = offsetY < -THRESHOLD_PULL_TO_REFRESH;

    const shouldTriggerRefresh =
      !isRefreshing && !hasJustRefreshed && crossesRefreshThreshold;

    if (shouldTriggerRefresh) {
      onRefresh();
    }
  };

  const handleScrollContentEvent = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const pinsBoardHeight = event.nativeEvent.contentSize.height;

    const crossesScrollThreshold =
      offsetY > pinsBoardHeight - MARGIN_SCROLL_BEFORE_NEW_FETCH;

    const shouldTriggerNextPage =
      !isFetchingMorePins &&
      hasJustFetchedMorePins.current === false &&
      crossesScrollThreshold;

    if (shouldTriggerNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Fetch initial pins:
  useEffect(() => {
    onNextPage();
  }, []);

  // React to user scrolling down to next page:
  useEffect(() => {
    if (currentPage > 1) {
      onNextPage();
    }
  }, [currentPage]);

  return (
    <PinsBoard
      pins={pins}
      pinImageAspectRatios={pinImageAspectRatios}
      isFetchingMorePins={isFetchingMorePins}
      fetchMorePinsError={fetchMorePinsError}
      isRefreshing={isRefreshing}
      hasJustRefreshed={hasJustRefreshed}
      refreshError={refreshError}
      handleScroll={handleScroll}
      getTapHandlerForPin={getTapHandlerForPin}
    />
  );
};

export default PinsBoardContainer;
