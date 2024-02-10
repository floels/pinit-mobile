import { createStackNavigator } from "@react-navigation/stack";

import { PinType } from "../lib/types";

import HomeBaseScreen from "@/src/screens/HomeBaseScreen";
import PinDetailsScreen from "@/src/screens/PinDetailsScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
  PinDetails: { pin: PinType; pinImageAspectRatio: number };
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
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
