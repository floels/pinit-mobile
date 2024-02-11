import { createStackNavigator } from "@react-navigation/stack";

import SearchResultsNavigator from "@/src/navigators/SearchResultsNavigator";
import SearchBaseScreen from "@/src/screens/SearchBaseScreen";

export type SearchNavigatorParamList = {
  SearchBase: undefined;
  SearchResults: { searchTerm: string };
};

const SearchNavigator = () => {
  const StackNavigator = createStackNavigator<SearchNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="SearchBase" component={SearchBaseScreen} />
      <StackNavigator.Screen
        name="SearchResults"
        component={SearchResultsNavigator}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchNavigator;
