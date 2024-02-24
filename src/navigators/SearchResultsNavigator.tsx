import { NavigationProp, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SearchNavigatorParamList } from "./SearchNavigator";

import { Pin } from "@/src/lib/types";
import SearchResultsBaseScreenContainer from "@/src/screens/SearchResultsBaseScreenContainer";
import PinDetailsScreenContainer from "@/src/screens/PinDetailsScreenContainer";

type SearchResultsNavigatorProps = {
  route: RouteProp<SearchNavigatorParamList, "SearchResults">;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
};

export type SearchResultsNavigatorParamList = {
  SearchResultsBase: undefined;
  PinDetails: { pin: Pin; pinImageAspectRatio: number };
};

const SearchResultsNavigator = ({
  route,
  navigation,
}: SearchResultsNavigatorProps) => {
  const { searchTerm } = route.params;

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
            handlePressBack={navigation.goBack}
          />
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen
        name="PinDetails"
        component={PinDetailsScreenContainer}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchResultsNavigator;
