import { createStackNavigator } from "@react-navigation/stack";

import { PinType } from "@/src/lib/types";
import HomeBaseScreen from "@/src/screens/HomeBaseScreen";
import PinDetailsScreenContainer from "@/src/screens/PinDetailsScreenContainer";

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
      <StackNavigator.Screen
        name="PinDetails"
        component={PinDetailsScreenContainer}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
