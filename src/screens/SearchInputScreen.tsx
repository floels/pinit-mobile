import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Text, TextInput } from "react-native";

import styles from "./SearchInputScreen.styles";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";

type SearchInputScreenProps = {
  navigation: NavigationProp<SearchNavigatorParamList>;
};

const SearchInputScreen = ({ navigation }: SearchInputScreenProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchInputAndCancelButton}>
        <TextInput
          placeholder={t("SearchScreen.INPUT_SCREEN_SEARCH_INPUT_PLACEHOLDER")}
          autoFocus
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>
            {t("SearchScreen.CANCEL_SEARCH_INPUT")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInputScreen;
