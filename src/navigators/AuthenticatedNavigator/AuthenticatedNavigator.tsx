import { createStackNavigator } from "@react-navigation/stack";
import AuthenticatedMainNavigator from "../AuthenticatedMainNavigator/AuthenticatedMainNavigator";
import CreatePinScreen from "./CreatePinScreen";

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
