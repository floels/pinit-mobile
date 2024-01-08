import {
  StackCardInterpolationProps,
  createStackNavigator,
} from "@react-navigation/stack";

import SearchInputScreenContainer from "../screens/SearchInputScreenContainer";
import SearchResultsScreen from "../screens/SearchResultsScreen";

import SearchBaseScreen from "@/src/screens/SearchBaseScreen";

export type SearchNavigatorParamList = {
  SearchBase: undefined;
  SearchInput: undefined;
  SearchResults: { searchTerm: string };
};

// See https://reactnavigation.org/docs/stack-navigator#animation-related-options:
const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const TRANSITION_SPEC = {
  animation: "timing" as "timing",
  config: { duration: 1 },
};

const SearchNavigator = () => {
  const StackNavigator = createStackNavigator<SearchNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forFade,
        transitionSpec: {
          open: TRANSITION_SPEC,
          close: TRANSITION_SPEC,
        },
      }}
    >
      <StackNavigator.Screen name="SearchBase" component={SearchBaseScreen} />
      <StackNavigator.Screen
        name="SearchInput"
        component={SearchInputScreenContainer}
      />
      <StackNavigator.Screen
        name="SearchResults"
        component={SearchResultsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchNavigator;
