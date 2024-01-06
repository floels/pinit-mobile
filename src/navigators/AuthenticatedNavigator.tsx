import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

type AuthenticatedNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Profile: undefined;
};

type AuthenticatedNavigatorProps = {
  handlePressLogOut: () => void;
};

const TAB_BAR_ICON_NAMES: Record<string, string> = {
  Home: "home",
  Search: "search",
  Create: "plus",
  Profile: "user",
};

const AuthenticatedNavigator = ({
  handlePressLogOut,
}: AuthenticatedNavigatorProps) => {
  const TabNavigator =
    createBottomTabNavigator<AuthenticatedNavigatorParamList>();

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<AuthenticatedNavigatorParamList>;
  }) => {
    const tabBarIcon = ({ color }: { color: string }) => (
      <FontAwesome5
        name={TAB_BAR_ICON_NAMES[route.name]}
        size={24}
        color={color}
      />
    );

    return {
      tabBarIcon,
      tabBarShowLabel: false,
      headerShown: false,
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
    };
  };

  return (
    <TabNavigator.Navigator screenOptions={screenOptions}>
      <TabNavigator.Screen name="Home">
        {() => <HomeScreen handlePressLogOut={handlePressLogOut} />}
      </TabNavigator.Screen>
      <TabNavigator.Screen name="Search">{() => null}</TabNavigator.Screen>
      <TabNavigator.Screen name="Create">{() => null}</TabNavigator.Screen>
      <TabNavigator.Screen name="Profile">{() => null}</TabNavigator.Screen>
    </TabNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
