import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import ProfileScreen from "@/src/screens/ProfileScreen";
import SearchNavigator from "./SearchNavigator";
import HomeNavigator from "./HomeNavigator";

type AuthenticatedNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Profile: undefined;
};

const TAB_BAR_ICON_NAMES: Record<string, string> = {
  Home: "home",
  Search: "search",
  Create: "plus",
  Profile: "user",
};

const AuthenticatedNavigator = () => {
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
      <TabNavigator.Screen name="Home" component={HomeNavigator} />
      <TabNavigator.Screen name="Search" component={SearchNavigator} />
      <TabNavigator.Screen name="Create">{() => null}</TabNavigator.Screen>
      <TabNavigator.Screen name="Profile" component={ProfileScreen} />
    </TabNavigator.Navigator>
  );
};

export default AuthenticatedNavigator;
