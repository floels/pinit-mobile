import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import HomeNavigator from "../HomeNavigator/HomeNavigator";
import SearchNavigator from "../SearchNavigator/SearchNavigator";

import ProfileScreen from "@/src/navigators/AuthenticatedMainNavigator/ProfileScreen";
import { useState } from "react";
import CreateSelectModal from "@/src/components/CreateSelectModal/CreateSelectModal";

type AuthenticatedMainNavigatorParamList = {
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

const AuthenticatedMainNavigator = () => {
  const [isCreateSelectModalVisible, setIsCreateSelectModalVisible] =
    useState(false);

  const TabNavigator =
    createBottomTabNavigator<AuthenticatedMainNavigatorParamList>();

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<AuthenticatedMainNavigatorParamList>;
  }) => {
    const tabBarIcon = ({ color }: { color: string }) => (
      <FontAwesome5Icon
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

  const createTabPressListener = (event: any) => {
    event.preventDefault(); // prevent regular navigation to "Create" screen (which renders nothing)

    setIsCreateSelectModalVisible(true);
  };

  const handlePressCreatePin = () => {};

  const handleCloseCreateSelectModal = () => {
    setIsCreateSelectModalVisible(false);
  };

  return (
    <>
      <TabNavigator.Navigator screenOptions={screenOptions}>
        <TabNavigator.Screen name="Home" component={HomeNavigator} />
        <TabNavigator.Screen name="Search" component={SearchNavigator} />
        <TabNavigator.Screen
          name="Create"
          listeners={{ tabPress: createTabPressListener }}
        >
          {() => null}
        </TabNavigator.Screen>
        <TabNavigator.Screen name="Profile" component={ProfileScreen} />
      </TabNavigator.Navigator>
      {isCreateSelectModalVisible && (
        <CreateSelectModal
          handlePressCreatePin={handlePressCreatePin}
          handleClose={handleCloseCreateSelectModal}
        />
      )}
    </>
  );
};

export default AuthenticatedMainNavigator;
