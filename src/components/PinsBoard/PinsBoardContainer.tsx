import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from "react-native";

import PinsBoard, { THRESHOLD_PULL_TO_REFRESH } from "./PinsBoard";

import { API_BASE_URL } from "@/src/lib/constants";
import { PinType } from "@/src/lib/types";
import { getPinsWithCamelCaseKeys } from "@/src/lib/utils/adapters";
import { fetchWithAuthentication } from "@/src/lib/utils/fetch";
import { appendQueryParam } from "@/src/lib/utils/strings";
import { NetworkError, ResponseKOError } from "@/src/lib/customErrors";

type PinsBoardContainerProps = {
  fetchEndpoint: string;
  shouldAuthenticate?: boolean;
};

const MARGIN_SCROLL_BEFORE_NEW_FETCH = 10000; // the margin we leave ourselves
// in terms of remaining scroll before reaching the end of the board.
// This margin will determine when we trigger the fetching of new pins (see below).

const TIMEOUT_HIDE_SPINNER_PREVIEW_AFTER_REFRESH_MS = 1000; // after the user just
// refreshed pins, we wait for this timeout before displaying the refresh spinner
// preview again. Otherwise, there's a weird visual effect if the user continues
// scrolling down further than the refresh threshold.

export const DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS = 500; // this debounce
// is introduced to avoid fetching the two next pages instead of just the next
// page when the user scrolls down.

const PinsBoardContainer = ({
  fetchEndpoint,
  shouldAuthenticate,
}: PinsBoardContainerProps) => {
  const { t } = useTranslation();

  const windowHeight = Dimensions.get("window").height;

  const [pins, setPins] = useState<PinType[]>([]);
  const [pinImageAspectRatios, setPinImageAspectRatios] = useState<
    (number | null)[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMorePins, setIsFetchingMorePins] = useState(false);
  const [hasJustFetchedMorePins, setHasJustFetchedMorePins] = useState(false);
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
      if (error instanceof NetworkError) {
        setFetchMorePinsError(t("Common.CONNECTION_ERROR"));
        return;
      }
      setFetchMorePinsError(t("Common.ERROR_FETCH_MORE_PINS"));
      return;
    } finally {
      setIsFetchingMorePins(false);
    }

    const { nextPins, nextPinsImageAspectRatios } = nextPinsAndAspectRatios;

    setPins((previousPins) => [...previousPins, ...nextPins]);
    setPinImageAspectRatios((previousAspectRatios) => [
      ...previousAspectRatios,
      ...nextPinsImageAspectRatios,
    ]);
    setHasJustFetchedMorePins(true);
    setTimeout(() => {
      setHasJustFetchedMorePins(false);
    }, DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS);
  };

  const onRefresh = async () => {
    setCurrentPage(1);
    setIsRefreshing(true);
    resetAllErrors();

    let firstPinsAndAspectRatios;

    try {
      firstPinsAndAspectRatios = await fetchNextPinsAndImageRatios();
    } catch (error) {
      if (error instanceof NetworkError) {
        setRefreshError(t("Common.CONNECTION_ERROR"));
        return;
      }
      setRefreshError(t("Common.ERROR_FETCH_MORE_PINS"));
      return;
    } finally {
      setIsRefreshing(false);
    }

    const {
      nextPins: firstPins,
      nextPinsImageAspectRatios: firstPinsImageRatios,
    } = firstPinsAndAspectRatios;

    setPins(firstPins);
    setPinImageAspectRatios(firstPinsImageRatios);
    setHasJustRefreshed(true);
    setTimeout(() => {
      setHasJustRefreshed(false);
    }, TIMEOUT_HIDE_SPINNER_PREVIEW_AFTER_REFRESH_MS);
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
    const aspectRatioPromises = pins.map((pin) => {
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
    });

    const imageRatios = await Promise.all(aspectRatioPromises);

    return imageRatios as (number | null)[];
  };

  const resetAllErrors = () => {
    setFetchMorePinsError("");
    setRefreshError("");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isFetchingMorePins || hasJustFetchedMorePins || isRefreshing) {
      return;
    }

    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset < -THRESHOLD_PULL_TO_REFRESH) {
      onRefresh();
      return;
    }

    const pinsBoardHeight = event.nativeEvent.contentSize.height;

    if (
      windowHeight + currentOffset >
      pinsBoardHeight - MARGIN_SCROLL_BEFORE_NEW_FETCH
    ) {
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
    />
  );
};

export default PinsBoardContainer;
