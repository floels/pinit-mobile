import { RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthorAccountDetailsScreen from "./AuthorAccountDetailsScreen";
import PinDetailsScreen from "./PinDetailsScreen";
import { SearchNavigatorParamList } from "../SearchNavigator/SearchNavigator";

import { Account, PinWithAuthorDetails } from "@/src/lib/types";
import SearchResultsBaseScreenContainer from "@/src/navigators/SearchResultsNavigator/SearchResultsBaseScreenContainer";

type SearchResultsNavigatorProps = {
  route: RouteProp<SearchNavigatorParamList, "SearchResults">;
};

export type SearchResultsNavigatorParamList = {
  SearchResultsBase: undefined;
  PinDetails: {
    pin: PinWithAuthorDetails;
    pinImageAspectRatio: number;
  };
  AuthorAccountDetails: {
    accountDetailsQuery: {
      data: Account | undefined;
      isLoading: boolean;
      isError: boolean;
    };
  };
};

const SearchResultsNavigator = ({ route }: SearchResultsNavigatorProps) => {
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
      <StackNavigator.Screen name="PinDetails" component={PinDetailsScreen} />
      <StackNavigator.Screen
        name="AuthorAccountDetails"
        component={AuthorAccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default SearchResultsNavigator;
