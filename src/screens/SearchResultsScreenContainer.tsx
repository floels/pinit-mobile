import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SearchNavigatorParamList } from "../navigators/SearchNavigator";
import SearchResultsScreen from "./SearchResultsScreen";

type SearchResultsScreenContainerProps = {
  route: RouteProp<SearchNavigatorParamList, "SearchResults">;
  navigation: NavigationProp<SearchNavigatorParamList>;
};

const SearchResultsScreenContainer = ({
  route,
  navigation,
}: SearchResultsScreenContainerProps) => {
  const { searchTerm } = route.params;

  const handlePressBack = () => {
    navigation.navigate("SearchBase");
  };

  return (
    <SearchResultsScreen
      searchTerm={searchTerm}
      onPressBack={handlePressBack}
    />
  );
};

export default SearchResultsScreenContainer;
