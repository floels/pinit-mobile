import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import CreatedPinDetailsNavigator from "../CreatedPinDetailsNavigator/CreatedPinDetailsNavigator";

import { PinBasicDetails, PinWithAuthorDetails } from "@/src/lib/types";
import AuthenticatedMainNavigator from "@/src/navigators/AuthenticatedMainNavigator/AuthenticatedMainNavigator";
import CreatePinNavigator from "@/src/navigators/CreatePinNavigator/CreatePinNavigator";

export type AuthenticatedNavigatorParamList = {
  Main:
    | undefined
    | { createdPin: PinBasicDetails; createdPinImageAspectRatio: number };
  CreatePin: undefined;
  CreatedPinDetails: {
    createdPin: PinWithAuthorDetails;
    createdPinImageAspectRatio: number;
  };
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
      <StackNavigator.Screen
        name="CreatedPinDetails"
        component={CreatedPinDetailsNavigator}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
