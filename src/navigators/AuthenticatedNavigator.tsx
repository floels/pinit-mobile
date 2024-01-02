import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";

type AuthenticatedNavigatorProps = {
  handlePressLogOut: () => void;
};

const AuthenticatedNavigator = ({
  handlePressLogOut,
}: AuthenticatedNavigatorProps) => {
  const TabNavigator = createBottomTabNavigator();

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Home">
        {() => <HomeScreen handlePressLogOut={handlePressLogOut} />}
      </TabNavigator.Screen>
    </TabNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
