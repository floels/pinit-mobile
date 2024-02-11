import { NavigationProp, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SearchNavigatorParamList } from "./SearchNavigator";

import { PinType } from "@/src/lib/types";
import PinDetailsScreen from "@/src/screens/PinDetailsScreen";
import SearchResultsBaseScreenContainer from "@/src/screens/SearchResultsBaseScreenContainer";

type SearchResultsNavigatorProps = {
  route: RouteProp<SearchNavigatorParamList, "SearchResults">;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
};

export type SearchResultsNavigatorParamList = {
  SearchResultsBase: undefined;
  PinDetails: { pin: PinType; pinImageAspectRatio: number };
};

const SearchResultsNavigator = ({
  route,
  navigation,
}: SearchResultsNavigatorProps) => {
  const { searchTerm } = route.params;

  const handlePressBackInSearchResultsBaseScreen = navigation.goBack;

  const StackNavigator =
    createStackNavigator<SearchResultsNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="SearchResultsBase">
        {({ navigation }) => (
          <SearchResultsBaseScreenContainer
            navigation={navigation}
            initialSearchTerm={searchTerm}
            handlePressBack={handlePressBackInSearchResultsBaseScreen}
          />
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="PinDetails" component={PinDetailsScreen} />
    </StackNavigator.Navigator>
  );
};

export default SearchResultsNavigator;
