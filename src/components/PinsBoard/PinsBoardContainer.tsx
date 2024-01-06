import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import PinsBoard from "./PinsBoard";

import { API_ENDPOINT_GET_PIN_SUGGESTIONS } from "@/src/lib/constants";
import { PinType } from "@/src/lib/types";
import { getPinsWithCamelCaseKeys } from "@/src/lib/utils/adapters";
import { fetchWithAuthentication } from "@/src/lib/utils/fetch";

const MARGIN_SCROLL_BEFORE_NEW_FETCH = 5000; // the margin we leave ourselves
// in terms of remaining scroll before reaching the end of suggestions.
// This margin will determine when we trigger the fetching of new suggestions (see below).

const PinsBoardContainer = () => {
  const { t } = useTranslation();

  const windowHeight = Dimensions.get("window").height;

  const [pins, setPins] = useState<PinType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchPinSuggestions = async () => {
    setIsFetching(true);
    setFetchError("");

    let response;

    try {
      const endpoint = `${API_ENDPOINT_GET_PIN_SUGGESTIONS}/?page=${currentPage}`;
      response = await fetchWithAuthentication({ endpoint });
    } catch {
      setFetchError(t("Common.CONNECTION_ERROR"));
      return;
    } finally {
      setIsFetching(false);
    }

    if (!response.ok) {
      setFetchError(t("HomeScreen.ERROR_FETCH_PIN_SUGGESTIONS"));
      return;
    }

    setFetchError("");
    setCurrentPage(currentPage + 1);

    const responseData = await response.json();
    const newPins = getPinsWithCamelCaseKeys(responseData.results);
    setPins([...pins, ...newPins]);
  };

  useEffect(() => {
    fetchPinSuggestions();
  }, []);

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
      setCurrentPage(currentPage + 1);
      fetchPinSuggestions();
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
