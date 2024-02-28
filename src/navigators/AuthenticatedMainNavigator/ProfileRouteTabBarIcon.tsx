import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./ProfileRouteTabBarIcon.styles";

import { PROFILE_PICTURE_URL_STORAGE_KEY } from "@/src/lib/constants";

type ProfileRouteTabBarIconProps = {
  focused: boolean;
  color: string;
};

const ProfileRouteTabBarIcon = ({
  focused,
  color,
}: ProfileRouteTabBarIconProps) => {
  const [profilePictureURL, setProfilePictureURL] = useState<string | null>(
    null,
  );

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

  if (profilePictureURL) {
    const image = (
      <Image
        source={{ uri: profilePictureURL }}
        style={styles.profilePicture}
      />
    );

    if (focused) {
      return <View style={styles.focusedProfilePictureContainer}>{image}</View>;
    }

    return image;
  }

  return <FontAwesome5Icon name="user" size={24} color={color} />;
};

export default ProfileRouteTabBarIcon;
