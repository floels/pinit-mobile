import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import debounce from "lodash/debounce";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

import SearchInputScreen from "./SearchInputScreen";
import {
  API_BASE_URL,
  API_ENDPOINT_SEARCH_SUGGESTIONS,
} from "../lib/constants";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";

type SearchInputScreenProps = {
  navigation: NavigationProp<SearchNavigatorParamList>;
};

export const MAX_SUGGESTIONS_TO_RENDER = 12;
export const AUTOCOMPLETE_DEBOUNCE_TIME_MS = 300;

const getSuggestionsWithSearchTermAtTop = ({
  searchTerm,
  originalSuggestions,
}: {
  searchTerm: string;
  originalSuggestions: string[];
}) => {
  const isSearchTermIncludedInSuggestions =
    originalSuggestions.includes(searchTerm);

  if (isSearchTermIncludedInSuggestions) {
    // NB: normally the API returns 12 suggestions at most
    // so this `slice` is just for precaution.
    return originalSuggestions.slice(0, MAX_SUGGESTIONS_TO_RENDER);
  }

  // If search term is not present, add searchTerm as the first suggestion
  // (and drop the last suggestion received from the API):
  const remainingOriginalSuggestions = originalSuggestions.slice(
    0,
    MAX_SUGGESTIONS_TO_RENDER - 1,
  );

  return [searchTerm, ...remainingOriginalSuggestions];
};

const SearchInputScreenContainer = ({ navigation }: SearchInputScreenProps) => {
  const searchInputRef = useRef<TextInput>(null);

  const [inputValue, setInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const handlePressClear = () => {
    setInputValue("");
  };

  const handleSearchInputSubmit = () => {
    navigation.navigate("SearchResults", { searchTerm: inputValue });
  };

  const fetchSearchSuggestions = async () => {
    let response;

    try {
      response = await fetch(
        `${API_BASE_URL}/${API_ENDPOINT_SEARCH_SUGGESTIONS}/?search=${inputValue.toLowerCase()}`,
      );
    } catch {
      setSearchSuggestions([]);
      return;
    }

    if (!response.ok) {
      setSearchSuggestions([]);
      return;
    }

    let responseData;

    try {
      responseData = await response.json();
    } catch {
      setSearchSuggestions([]);
      return;
    }

    const suggestionsWithSearchTermAtTop = getSuggestionsWithSearchTermAtTop({
      searchTerm: inputValue,
      originalSuggestions: responseData.results,
    });

    setSearchSuggestions(suggestionsWithSearchTermAtTop);
  };

  const debouncedFetchSearchSuggestions = debounce(
    fetchSearchSuggestions,
    AUTOCOMPLETE_DEBOUNCE_TIME_MS,
  );

  useEffect(() => {
    if (!inputValue) {
      setSearchSuggestions([]);
      return;
    }

    debouncedFetchSearchSuggestions();

    return () => {
      debouncedFetchSearchSuggestions.cancel();
    };
  }, [inputValue]);

  useFocusEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

  return (
    <SearchInputScreen
      inputValue={inputValue}
      onInputChange={setInputValue}
      searchSuggestions={searchSuggestions}
      onPressClear={handlePressClear}
      onSearchInputSubmit={handleSearchInputSubmit}
      onPressCancel={navigation.goBack}
      ref={searchInputRef}
    />
  );
};

export default SearchInputScreenContainer;
