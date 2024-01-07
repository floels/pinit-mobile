import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchInputScreen.styles";
import SearchSuggestionsList from "../components/SearchScreen/SearchSuggestionsList";

type SearchInputScreenProps = {
  inputValue: string;
  onInputChange: (value: string) => void;
  searchSuggestions: string[];
  onPressClear: () => void;
  onSearchInputSubmit: () => void;
  onPressCancel: () => void;
};

const SearchInputScreen = ({
  inputValue,
  onInputChange,
  searchSuggestions,
  onPressClear,
  onSearchInputSubmit,
  onPressCancel,
}: SearchInputScreenProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchInputAndCancelButton}>
        <View style={styles.searchInputAndClearIcon}>
          <TextInput
            value={inputValue}
            placeholder={t(
              "SearchScreen.INPUT_SCREEN_SEARCH_INPUT_PLACEHOLDER",
            )}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onInputChange}
            onSubmitEditing={onSearchInputSubmit}
            style={styles.searchInput}
          />
          {inputValue && (
            <TouchableOpacity onPress={onPressClear} style={styles.clearIcon}>
              <FontAwesome5 name="times-circle" size={16} solid />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={onPressCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>
            {t("SearchScreen.CANCEL_SEARCH_INPUT")}
          </Text>
        </TouchableOpacity>
      </View>
      <SearchSuggestionsList suggestions={searchSuggestions} />
    </View>
  );
};

export default SearchInputScreen;