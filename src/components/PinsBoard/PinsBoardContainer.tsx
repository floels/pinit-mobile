import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import PinsBoard from "./PinsBoard";

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
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchNextPinsAndFallBack = async () => {
    try {
      await fetchNextPins();
    } catch {
      setFetchError(t("Common.CONNECTION_ERROR"));
      setIsFetching(false);
    }
  };

  const fetchNextPins = async () => {
    setIsFetching(true);
    setFetchError("");

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

    setIsFetching(false);

    if (!newPinsResponse.ok) {
      setFetchError(t("HomeScreen.ERROR_FETCH_PIN_SUGGESTIONS"));
      return;
    }

    setFetchError("");

    await updateStateWithNewResponse(newPinsResponse);
  };

  const updateStateWithNewResponse = async (newPinsResponse: any) => {
    const responseData = await newPinsResponse.json();

    const newPins = getPinsWithCamelCaseKeys(responseData.results);

    setPins((previousPins) => [...previousPins, ...newPins]);
  };

  useEffect(() => {
    fetchNextPinsAndFallBack();
  }, [currentPage]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isFetching) {
      return;
    }

    const pinsBoardHeight = event.nativeEvent.contentSize.height;
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (
      windowHeight + currentOffset >
      pinsBoardHeight - MARGIN_SCROLL_BEFORE_NEW_FETCH
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <PinsBoard
      pins={pins}
      isFetching={isFetching}
      fetchError={fetchError}
      handleScroll={handleScroll}
    />
  );
};

export default PinsBoardContainer;
