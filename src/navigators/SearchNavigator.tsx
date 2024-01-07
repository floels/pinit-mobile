import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
  createStackNavigator,
} from "@react-navigation/stack";

import SearchInputScreenContainer from "../screens/SearchInputScreenContainer";
import SearchResultsScreen from "../screens/SearchResultsScreen";

import SearchBaseScreen from "@/src/screens/SearchBaseScreen";

export type SearchNavigatorParamList = {
  SearchBase: undefined;
  SearchInput: { initialSearchTerm: string };
  SearchResults: { searchTerm: string };
};

const instantlyAppearInterpolator = (props: StackCardInterpolationProps) => {
  return {
    cardStyle: {
      opacity: 1,
    },
  };
};

const instantlyDisappearInterpolator = (props: StackCardInterpolationProps) => {
  return CardStyleInterpolators.forHorizontalIOS(props);
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
        name="SearchInput"
        component={SearchInputScreenContainer}
        options={{ cardStyleInterpolator: instantlyAppearInterpolator }}
      />
      <StackNavigator.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ cardStyleInterpolator: instantlyDisappearInterpolator }}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchNavigator;
