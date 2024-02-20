import { NavigationProp } from "@react-navigation/native";
import { useRef, useState } from "react";
import { TextInput } from "react-native";

import SearchResultsBaseScreen from "./SearchResultsBaseScreen";
import { API_ENDPOINT_SEARCH } from "../lib/constants";
import { Pin } from "../lib/types";
import { SearchResultsNavigatorParamList } from "../navigators/SearchResultsNavigator";

type SearchResultsBaseScreenContainerProps = {
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
  initialSearchTerm: string;
  handlePressBack: () => void;
};

const SearchResultsBaseScreenContainer = ({
  navigation,
  initialSearchTerm,
  handlePressBack,
}: SearchResultsBaseScreenContainerProps) => {
  const searchInputRef = useRef<TextInput>(null);

  const [searchInputValue, setSearchInputValue] = useState(initialSearchTerm);
  const [lastSubmittedSearchTerm, setLastSubmittedSearchTerm] =
    useState(initialSearchTerm);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const handleSearchInputFocus = () => {
    setIsSearchInputFocused(true);
  };

  const handlePressSearchInputCancel = () => {
    setSearchInputValue(lastSubmittedSearchTerm);
    searchInputRef.current?.blur();
    setIsSearchInputFocused(false);
  };

  const handlePressSearchInputClear = () => {
    setSearchInputValue("");
  };

  const handleSearchInputSubmit = () => {
    setLastSubmittedSearchTerm(searchInputValue);
    searchInputRef.current?.blur();
    setIsSearchInputFocused(false);
  };

  const getPressHandlerForSearchSuggestion =
    ({ suggestion }: { suggestion: string }) =>
    () => {
      setSearchInputValue(suggestion);
      setLastSubmittedSearchTerm(suggestion);
      searchInputRef.current?.blur();
      setIsSearchInputFocused(false);
    };

  const getTapHandlerForPin = ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: Pin;
    pinImageAspectRatio: number;
  }) => {
    return () => {
      navigation.navigate("PinDetails", { pin, pinImageAspectRatio });
    };
  };

  const searchEndpoint = `${API_ENDPOINT_SEARCH}/?q=${lastSubmittedSearchTerm.toLowerCase()}`;

  const showBackButton = !isSearchInputFocused;

  return (
    <SearchResultsBaseScreen
      showBackButton={showBackButton}
      searchInputValue={searchInputValue}
      isSearchInputFocused={isSearchInputFocused}
      searchEndpoint={searchEndpoint}
      handlePressBack={handlePressBack}
      handleSearchInputFocus={handleSearchInputFocus}
      handlePressSearchInputCancel={handlePressSearchInputCancel}
      handlePressSearchInputClear={handlePressSearchInputClear}
      setSearchInputValue={setSearchInputValue}
      handleSearchInputSubmit={handleSearchInputSubmit}
      getPressHandlerForSearchSuggestion={getPressHandlerForSearchSuggestion}
      getTapHandlerForPin={getTapHandlerForPin}
      ref={searchInputRef}
    />
  );
};

export default SearchResultsBaseScreenContainer;