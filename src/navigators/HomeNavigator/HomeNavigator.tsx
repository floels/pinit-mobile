import { createStackNavigator } from "@react-navigation/stack";

import PinDetailsScreen from "./PinDetailsScreen";

import { AccountPublicDetails, Pin } from "@/src/lib/types";
import HomeBaseScreen from "@/src/navigators/HomeNavigator/HomeBaseScreen";
import AccountDetailsScreen from "./AccountDetailsScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
  PinDetails: { pin: Pin; pinImageAspectRatio: number };
  AuthorAccountDetails: {
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
      <StackNavigator.Screen name="PinDetails" component={PinDetailsScreen} />
      <StackNavigator.Screen
        name="AuthorAccountDetails"
        component={AccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
