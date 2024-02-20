import { createStackNavigator } from "@react-navigation/stack";

import { AccountPublicDetails, Pin } from "@/src/lib/types";
import HomeBaseScreen from "@/src/screens/HomeBaseScreen";
import PinDetailsScreenContainer from "@/src/screens/PinDetailsScreenContainer";
import { UseQueryResult } from "@tanstack/react-query";
import AccountDetailsScreen from "@/src/screens/AccountDetailsScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
  PinDetails: { pin: Pin; pinImageAspectRatio: number };
  AuthorAccountDetails: {
    accountDetailsQuery: UseQueryResult<AccountPublicDetails, Error>;
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
      <StackNavigator.Screen
        name="PinDetails"
        component={PinDetailsScreenContainer}
      />
      <StackNavigator.Screen
        name="AuthorAccountDetails"
        component={AccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
