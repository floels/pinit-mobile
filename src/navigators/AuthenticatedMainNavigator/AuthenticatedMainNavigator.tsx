import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import CreateSelectModal from "@/src/components/CreateSelectModal/CreateSelectModal";
import { useAccountContext } from "@/src/contexts/accountContext";
import { PROFILE_PICTURE_URL_STORAGE_KEY } from "@/src/lib/constants";
import { PinWithAuthorDetails } from "@/src/lib/types";
import ProfileScreen from "@/src/navigators/AuthenticatedMainNavigator/ProfileScreen";
import { AuthenticatedNavigatorParamList } from "@/src/navigators/AuthenticatedNavigator/AuthenticatedNavigator";
import HomeNavigator from "@/src/navigators/HomeNavigator/HomeNavigator";
import SearchNavigator from "@/src/navigators/SearchNavigator/SearchNavigator";

type AuthenticatedMainNavigatorProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
  route: RouteProp<AuthenticatedNavigatorParamList, "Main">;
};

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

const AuthenticatedMainNavigator = ({
  navigation,
  route,
}: AuthenticatedMainNavigatorProps) => {
  const { createdPin, createdPinImageAspectRatio } = route.params || {}; // 'route.params' is undefined
  // except when we just created a pin.

  const {
    state: { account },
  } = useAccountContext();

  const [profilePictureURL, setProfilePictureURL] = useState<string | null>(
    null,
  );

  const [isCreateSelectModalVisible, setIsCreateSelectModalVisible] =
    useState(false);

  const TabNavigator =
    createBottomTabNavigator<AuthenticatedMainNavigatorParamList>();

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<AuthenticatedMainNavigatorParamList>;
  }) => {
    let tabBarIcon;

    if (route.name === "Profile") {
      tabBarIcon = getTabBarIconForProfileRoute();
    } else {
      tabBarIcon = ({ color }: { color: string }) => (
        <FontAwesome5Icon
          name={TAB_BAR_ICON_NAMES[route.name]}
          size={24}
          color={color}
        />
      );
    }

    return {
      tabBarIcon,
      tabBarShowLabel: false,
      headerShown: false,
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
    };
  };

  const getTabBarIconForProfileRoute = () => {
    if (profilePictureURL) {
      return () => (
        <Image source={{ uri: profilePictureURL }} width={10} height={10} />
      );
    }

    return ({ color }: { color: string }) => (
      <FontAwesome5Icon
        name={TAB_BAR_ICON_NAMES.Profile}
        size={24}
        color={color}
      />
    );
  };

  const createTabPressListener = (event: any) => {
    event.preventDefault(); // prevent regular navigation to "Create" screen (which renders nothing)

    setIsCreateSelectModalVisible(true);
  };

  const handlePressCreatePin = () => {
    navigation.navigate("CreatePin");

    setIsCreateSelectModalVisible(false); // otherwise the modal will
    // still be visible on the "Create pin" screen
  };

  const handleCloseCreateSelectModal = () => {
    setIsCreateSelectModalVisible(false);
  };

  const fetchProfilePictureURL = async () => {
    const fetchedProfilePictureURL = await AsyncStorage.getItem(
      PROFILE_PICTURE_URL_STORAGE_KEY,
    );

    if (fetchedProfilePictureURL) {
      setProfilePictureURL(fetchedProfilePictureURL);
    }
  };

  useEffect(() => {
    fetchProfilePictureURL();
  }, []);

  useEffect(() => {
    if (createdPin && createdPinImageAspectRatio) {
      showPinCreationToast();
    }
  }, [createdPin, createdPinImageAspectRatio]);

  const showPinCreationToast = () => {
    const createdPinWithAuthorDetails = {
      ...createdPin,
      authorUsername: account?.username,
      authorDisplayName: account?.displayName,
      authorProfilePictureURL: account?.profilePictureURL,
    };

    const handlePressViewPin = () => {
      navigation.navigate("CreatedPinDetails", {
        createdPin: createdPinWithAuthorDetails as PinWithAuthorDetails,
        createdPinImageAspectRatio: createdPinImageAspectRatio as number,
      });
    };

    Toast.show({
      type: "pinCreationSuccess",
      position: "bottom",
      props: { handlePressViewPin },
    });
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
