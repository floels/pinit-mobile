import { createStackNavigator } from "@react-navigation/stack";

import SearchInputScreenContainer from "../screens/SearchInputScreenContainer";

import SearchBaseScreen from "@/src/screens/SearchBaseScreen";

export type SearchNavigatorParamList = {
  SearchBase: undefined;
  SearchInput: undefined;
};

const appearInPlaceInterpolator = () => ({
  cardStyle: {
    opacity: 1,
  },
});

const SearchNavigator = () => {
  const StackNavigator = createStackNavigator();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: appearInPlaceInterpolator,
      }}
    >
      <StackNavigator.Screen name="SearchBase" component={SearchBaseScreen} />
      <StackNavigator.Screen
        name="SearchInput"
        component={SearchInputScreenContainer}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchNavigator;
