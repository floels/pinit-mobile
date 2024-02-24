import { Ref, forwardRef } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchResultsBaseScreen.styles";
import PinsBoardContainer from "@/src/components/PinsBoard/PinsBoardContainer";
import PinsSearchInputContainer from "@/src/components/PinsSearchInput/PinsSearchInputContainer";
import { Pin } from "@/src/lib/types";

type SearchResultsBaseScreenProps = {
  showBackButton: boolean;
  searchInputValue: string;
  isSearchInputFocused: boolean;
  searchEndpoint: string;
  handlePressBack: () => void;
  handleSearchInputFocus: () => void;
  handlePressSearchInputCancel: () => void;
  handlePressSearchInputClear: () => void;
  setSearchInputValue: (newValue: string) => void;
  handleSearchInputSubmit: () => void;
  getPressHandlerForSearchSuggestion: ({
    suggestion,
  }: {
    suggestion: string;
  }) => () => void;
  getTapHandlerForPin: ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: Pin;
    pinImageAspectRatio: number;
  }) => () => void;
};

const SearchResultsBaseScreen = forwardRef(
  (props: SearchResultsBaseScreenProps, ref: Ref<TextInput>) => {
    const {
      showBackButton,
      searchInputValue,
      isSearchInputFocused,
      searchEndpoint,
      handlePressBack,
      handleSearchInputFocus,
      handlePressSearchInputCancel,
      handlePressSearchInputClear,
      setSearchInputValue,
      handleSearchInputSubmit,
      getPressHandlerForSearchSuggestion,
      getTapHandlerForPin,
    } = props;

    return (
      <View style={styles.container}>
        <View style={styles.backButtonAndSearchInput}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handlePressBack}
              style={styles.backButton}
            >
              <FontAwesome5 name="chevron-left" size={20} />
            </TouchableOpacity>
          )}
          <View style={styles.searchInputContainer}>
            <PinsSearchInputContainer
              inputValue={searchInputValue}
              isInputFocused={isSearchInputFocused}
              handleInputFocus={handleSearchInputFocus}
              handlePressCancel={handlePressSearchInputCancel}
              handlePressClear={handlePressSearchInputClear}
              handleInputChange={setSearchInputValue}
              handleSubmit={handleSearchInputSubmit}
              getPressHandlerForSuggestion={getPressHandlerForSearchSuggestion}
              ref={ref}
            />
          </View>
        </View>
        <PinsBoardContainer
          fetchEndpoint={searchEndpoint}
          getTapHandlerForPin={getTapHandlerForPin}
          emptyResultsMessageKey="SearchScreen.NO_RESULTS"
        />
      </View>
    );
  },
);

export default SearchResultsBaseScreen;
