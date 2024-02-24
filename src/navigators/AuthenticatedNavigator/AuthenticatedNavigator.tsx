import { createStackNavigator } from "@react-navigation/stack";
import AuthenticatedMainNavigator from "../AuthenticatedMainNavigator/AuthenticatedMainNavigator";

const AuthenticatedNavigator = () => {
  const StackNavigator = createStackNavigator();

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
    </StackNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
