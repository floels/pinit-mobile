import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import AuthenticatedMainNavigator from "@/src/navigators/AuthenticatedMainNavigator/AuthenticatedMainNavigator";
import CreatePinNavigator from "@/src/navigators/CreatePinNavigator/CreatePinNavigator";

export type AuthenticatedNavigatorParamList = {
  Main: undefined;
  CreatePin: undefined;
};

const AuthenticatedNavigator = () => {
  const StackNavigator =
    createStackNavigator<AuthenticatedNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <StackNavigator.Screen
        name="Main"
        component={AuthenticatedMainNavigator}
      />
      <StackNavigator.Screen name="CreatePin" component={CreatePinNavigator} />
    </StackNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
