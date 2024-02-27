import { createStackNavigator } from "@react-navigation/stack";

import AccountDetailsScreen from "./AccountDetailsScreen";
import PinDetailsScreen from "./PinDetailsScreen";

import { AccountPublicDetails, PinWithAuthorDetails } from "@/src/lib/types";
import HomeBaseScreen from "@/src/navigators/HomeNavigator/HomeBaseScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
  HomeNavigatorPinDetails: {
    pin: PinWithAuthorDetails;
    pinImageAspectRatio: number;
  };
  HomeNavigatorAuthorAccountDetails: {
    accountDetailsQuery: {
      data: AccountPublicDetails | undefined;
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
      <StackNavigator.Screen
        name="HomeNavigatorPinDetails"
        component={PinDetailsScreen}
      />
      <StackNavigator.Screen
        name="HomeNavigatorAuthorAccountDetails"
        component={AccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
