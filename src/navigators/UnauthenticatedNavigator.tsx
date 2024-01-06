import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../screens/LandingScreen";
import LoginScreenContainer from "../screens/LoginScreenContainer";

type UnauthenticatedNavigatorProps = {
  onSuccessfulLogin: () => void;
};

export type UnauthenticatedNavigatorParamList = {
  LoginScreen: undefined;
};

const UnauthenticatedNavigator = ({
  onSuccessfulLogin,
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
          <LoginScreenContainer
            navigation={navigation}
            onSuccessfulLogin={onSuccessfulLogin}
          />
        )}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default UnauthenticatedNavigator;
