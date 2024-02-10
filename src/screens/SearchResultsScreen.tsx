import { NavigationProp, RouteProp } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchResultsScreen.styles";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_SEARCH } from "../lib/constants";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";

type SearchResultsScreenContainerProps = {
  route: RouteProp<SearchNavigatorParamList, "SearchResults">;
  navigation: NavigationProp<SearchNavigatorParamList>;
};

const SearchResultsScreenContainer = ({
  route,
  navigation,
}: SearchResultsScreenContainerProps) => {
  const { searchTerm } = route.params;

  const searchEndpoint = `${API_ENDPOINT_SEARCH}/?q=${searchTerm.toLowerCase()}`;

  const handlePressSearchInput = navigation.goBack;

  const handlePressBack = () => {
    navigation.navigate("SearchBase");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonAndSearchTerm}>
        <TouchableOpacity onPress={handlePressBack} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressSearchInput}
          style={styles.searchTerm}
        >
          <Text>{searchTerm}</Text>
        </TouchableOpacity>
      </View>
      <PinsBoardContainer fetchEndpoint={searchEndpoint} />
    </View>
  );
};

export default SearchResultsScreenContainer;
