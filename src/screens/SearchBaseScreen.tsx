import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchBaseScreen.styles";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";

type SearchBaseScreenProps = {
  navigation: NavigationProp<SearchNavigatorParamList>;
};

const SearchBaseScreen = ({ navigation }: SearchBaseScreenProps) => {
  const { t } = useTranslation();

  const handlePressInput = () => {
    navigation.navigate("SearchInput", { initialSearchTerm: "" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePressInput}
        style={styles.searchIconAndInput}
      >
        <FontAwesome5 name="search" size={16} style={styles.searchIcon} />
        <Text style={styles.searchInput}>
          {t("SearchScreen.BASE_SCREEN_SEARCH_INPUT_PLACEHOLDER")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBaseScreen;
