import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { PinBasicDetails } from "@/src/lib/types";
import AuthenticatedMainNavigator from "@/src/navigators/AuthenticatedMainNavigator/AuthenticatedMainNavigator";
import CreatePinNavigator from "@/src/navigators/CreatePinNavigator/CreatePinNavigator";

export type AuthenticatedNavigatorParamList = {
  Main: { createdPin?: PinBasicDetails; createdPinImageAspectRatio: number };
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
