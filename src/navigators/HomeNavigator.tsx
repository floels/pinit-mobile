import { createStackNavigator } from "@react-navigation/stack";

import HomeBaseScreen from "@/src/screens/HomeBaseScreen";
import { PinType } from "../lib/types";
import PinDetailsScreen from "../screens/PinDetailsScreen";

export type HomeNavigatorParamList = {
  HomeBase: undefined;
  PinDetails: { pin: PinType };
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
