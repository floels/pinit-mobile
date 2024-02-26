import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import CreatePinScreen from "./CreatePinScreen";
import AuthenticatedMainNavigator from "../AuthenticatedMainNavigator/AuthenticatedMainNavigator";

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
      <StackNavigator.Screen name="CreatePin" component={CreatePinScreen} />
    </StackNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
