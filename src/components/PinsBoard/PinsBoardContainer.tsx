import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import PinsBoard, { THRESHOLD_PULL_TO_REFRESH } from "./PinsBoard";

import { API_BASE_URL } from "@/src/lib/constants";
import { PinType } from "@/src/lib/types";
import { getPinsWithCamelCaseKeys } from "@/src/lib/utils/adapters";
import { fetchWithAuthentication } from "@/src/lib/utils/fetch";
import { appendQueryParam } from "@/src/lib/utils/strings";

type PinsBoardContainerProps = {
  fetchEndpoint: string;
  shouldAuthenticate?: boolean;
};

const MARGIN_SCROLL_BEFORE_NEW_FETCH = 5000; // the margin we leave ourselves
// in terms of remaining scroll before reaching the end of the board.
// This margin will determine when we trigger the fetching of new pins (see below).

const PinsBoardContainer = ({
  fetchEndpoint,
  shouldAuthenticate,
}: PinsBoardContainerProps) => {
  const { t } = useTranslation();

  const windowHeight = Dimensions.get("window").height;

  const [pins, setPins] = useState<PinType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMorePins, setIsFetchingMorePins] = useState(false);
  const [fetchMorePinsError, setFetchMorePinsError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState("");

  const resetAllErrors = () => {
    setFetchMorePinsError("");
    setRefreshError("");
  };

  const fetchNextPinsAndFallBack = async () => {
    try {
      await fetchNextPins();
    } catch {
      setFetchMorePinsError(t("Common.CONNECTION_ERROR"));
      setIsFetchingMorePins(false);
    }
  };

  const fetchNextPins = async () => {
    setIsFetchingMorePins(true);
    resetAllErrors();

    const endpointWithPageParameter = appendQueryParam({
      url: fetchEndpoint,
      key: "page",
      value: currentPage.toString(),
    });

    let newPinsResponse;

    if (shouldAuthenticate) {
      newPinsResponse = await fetchWithAuthentication({
        endpoint: endpointWithPageParameter,
      });
    } else {
      newPinsResponse = await fetch(
        `${API_BASE_URL}/${endpointWithPageParameter}`,
      );
    }

    setIsFetchingMorePins(false);

    if (!newPinsResponse.ok) {
      setFetchMorePinsError(t("Common.ERROR_FETCH_MORE_PINS"));
      return;
    }

    resetAllErrors();

    await updateStateWithNewPinsResponse(newPinsResponse);
  };

  const updateStateWithNewPinsResponse = async (newPinsResponse: Response) => {
    const responseData = await newPinsResponse.json();

    const newPins = getPinsWithCamelCaseKeys(responseData.results);

    setPins((previousPins) => [...previousPins, ...newPins]);
  };

  const refreshFirstPinsAndFallBack = async () => {
    try {
      await refreshFirstPins();
    } catch {
      setRefreshError(t("Common.CONNECTION_ERROR"));
      setIsRefreshing(false);
    }
  };

  const refreshFirstPins = async () => {
    setIsRefreshing(true);
    resetAllErrors();

    let getFirstPinsResponse;

    if (shouldAuthenticate) {
      getFirstPinsResponse = await fetchWithAuthentication({
        endpoint: fetchEndpoint,
      });
    } else {
      getFirstPinsResponse = await fetch(`${API_BASE_URL}/${fetchEndpoint}`);
    }

    setIsRefreshing(false);

    if (!getFirstPinsResponse.ok) {
      setRefreshError(t("Common.ERROR_REFRESH_PINS"));
      return;
    }

    resetAllErrors();

    await updateStateWithGetFirstPinsResponse(getFirstPinsResponse);
  };

  const updateStateWithGetFirstPinsResponse = async (
    getFirstPinsResponse: Response,
  ) => {
    const responseData = await getFirstPinsResponse.json();

    const firstPins = getPinsWithCamelCaseKeys(responseData.results);

    setPins(firstPins);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isFetchingMorePins || isRefreshing) {
      return;
    }

    const currentOffset = event.nativeEvent.contentOffset.y;

    // Pull-to-refresh logic:
    if (currentOffset < -THRESHOLD_PULL_TO_REFRESH) {
      setCurrentPage(1);
      refreshFirstPinsAndFallBack();
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
    fetchNextPinsAndFallBack();
  }, []);

  // React to user scrolling down to next page:
  useEffect(() => {
    if (currentPage > 1) {
      fetchNextPinsAndFallBack();
    }
  }, [currentPage]);

  return (
    <PinsBoard
      pins={pins}
      isFetchingMorePins={isFetchingMorePins}
      fetchMorePinsError={fetchMorePinsError}
      isRefreshing={isRefreshing}
      refreshError={refreshError}
      handleScroll={handleScroll}
    />
  );
};

export default PinsBoardContainer;
