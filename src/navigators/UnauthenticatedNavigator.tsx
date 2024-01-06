import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";

type UnauthenticatedNavigatorProps = {
  handleSubmitLogin: () => void;
};

export type UnauthenticatedNavigatorParamList = {
  LoginScreen: undefined; // Add other routes as needed
};

const UnauthenticatedNavigator = ({
  handleSubmitLogin,
}: UnauthenticatedNavigatorProps) => {
  const StackNavigator = createStackNavigator();

  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Home" component={LandingScreen} />
      <StackNavigator.Screen
        name="LoginScreen"
        options={{ presentation: "modal" }}
      >
        {({ navigation }) => (
          <LoginScreen
            navigation={navigation}
            handleSubmitLogin={handleSubmitLogin}
          />
        )}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default UnauthenticatedNavigator;
