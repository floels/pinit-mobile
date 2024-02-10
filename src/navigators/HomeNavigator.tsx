import { createStackNavigator } from "@react-navigation/stack";

import HomeBaseScreen from "@/src/screens/HomeBaseScreen";

type HomeNavigatorParamList = {
  HomeBase: undefined;
  PinDetails: undefined;
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
    </StackNavigator.Navigator>
  );
};

export default HomeNavigator;
