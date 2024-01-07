import { createStackNavigator } from "@react-navigation/stack";

import SearchInputScreenContainer from "../screens/SearchInputScreenContainer";

import SearchBaseScreen from "@/src/screens/SearchBaseScreen";
import SearchResultsScreenContainer from "../screens/SearchResultsScreenContainer";

export type SearchNavigatorParamList = {
  SearchBase: undefined;
  SearchInput: undefined;
  SearchResults: { searchTerm: string };
};

const appearInPlaceInterpolator = () => ({
  cardStyle: {
    opacity: 1,
  },
});

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
        name="SearchInput"
        component={SearchInputScreenContainer}
        options={{ cardStyleInterpolator: appearInPlaceInterpolator }}
      />
      <StackNavigator.Screen
        name="SearchResults"
        component={SearchResultsScreenContainer}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchNavigator;
