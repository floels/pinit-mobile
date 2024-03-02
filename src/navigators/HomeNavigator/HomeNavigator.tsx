import { createStackNavigator } from "@react-navigation/stack";

import AuthorAccountDetailsScreen from "./AuthorAccountDetailsScreen";
import PinDetailsScreen from "./PinDetailsScreen";

import { Account, PinWithAuthorDetails } from "@/src/lib/types";
import HomeBaseScreen from "@/src/navigators/HomeNavigator/HomeBaseScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
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

const HomeNavigator = () => {
  const StackNavigator = createStackNavigator<HomeNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="HomeBase" component={HomeBaseScreen} />
      <StackNavigator.Screen name="PinDetails" component={PinDetailsScreen} />
      <StackNavigator.Screen
        name="AuthorAccountDetails"
        component={AuthorAccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
