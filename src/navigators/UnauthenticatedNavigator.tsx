import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";

type UnauthenticatedNavigatorProps = {
  handlePressLogIn: () => void;
};

const UnauthenticatedNavigator = ({
  handlePressLogIn,
}: UnauthenticatedNavigatorProps) => {
  const StackNavigator = createNativeStackNavigator();

  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Home">
        {() => <LandingScreen handlePressLogIn={handlePressLogIn} />}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default UnauthenticatedNavigator;
