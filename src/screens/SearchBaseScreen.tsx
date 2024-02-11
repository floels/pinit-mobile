import { NavigationProp } from "@react-navigation/native";
import { useRef, useState } from "react";
import { TextInput, View } from "react-native";

import styles from "./SearchBaseScreen.styles";
import PinsSearchInputContainer from "../components/PinsSearchInput/PinsSearchInputContainer";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";

type SearchBaseScreenProps = {
  navigation: NavigationProp<SearchNavigatorParamList>;
};

const SearchBaseScreen = ({ navigation }: SearchBaseScreenProps) => {
  const searchInputRef = useRef<TextInput>(null);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const handleSearchInputFocus = () => {
    setIsSearchInputFocused(true);
  };

  const handlePressSearchInputCancel = () => {
    setSearchInputValue("");
    searchInputRef.current?.blur();
    setIsSearchInputFocused(false);
  };

  const handlePressSearchInputClear = () => {
    setSearchInputValue("");
  };

  const handleSearchInputSubmit = () => {
    navigation.navigate("SearchResults", { searchTerm: searchInputValue });
  };

  const getPressHandlerForSearchSuggestion =
    ({ suggestion }: { suggestion: string }) =>
    () => {
      navigation.navigate("SearchResults", { searchTerm: suggestion });
    };

  return (
    <View style={styles.container}>
      <PinsSearchInputContainer
        inputValue={searchInputValue}
        isInputFocused={isSearchInputFocused}
        withSearchIcon
        handleInputFocus={handleSearchInputFocus}
        handlePressCancel={handlePressSearchInputCancel}
        handlePressClear={handlePressSearchInputClear}
        handleInputChange={setSearchInputValue}
        handleSubmit={handleSearchInputSubmit}
        getPressHandlerForSuggestion={getPressHandlerForSearchSuggestion}
        ref={searchInputRef}
      />
    </View>
  );
};

export default SearchBaseScreen;
