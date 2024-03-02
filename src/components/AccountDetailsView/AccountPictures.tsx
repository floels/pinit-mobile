import {
  View,
  Dimensions,
  Image,
  StyleProp,
  ImageStyle,
  Text,
} from "react-native";

import styles from "./AccountPictures.styles";

import { Account } from "@/src/lib/types";

type AccountPicturesProps = {
  account: Account;
};

const AccountPictures = ({ account }: AccountPicturesProps) => {
  const { profilePictureURL, backgroundPictureURL, initial } = account;

  const screenWidth = Dimensions.get("window").width;

  let backgroundPicture;

  if (profilePictureURL && backgroundPictureURL) {
    backgroundPicture = (
      <Image
        source={{ uri: backgroundPictureURL }}
        width={screenWidth}
        style={styles.backgroundPictureImage}
        testID="account-background-picture"
      />
    );
  }

  let profilePicture;

  if (profilePictureURL) {
    const profilePictureStyle = [
      styles.profilePictureImage,
    ] as StyleProp<ImageStyle>[];

    profilePictureStyle.push(
      backgroundPictureURL
        ? styles.profilePictureImageWithBackgroundPicture
        : styles.profilePictureImageWithoutBackgroundPicture,
    );

    profilePicture = (
      <Image
        source={{ uri: profilePictureURL }}
        style={profilePictureStyle}
        testID="account-profile-picture"
      />
    );
  } else {
    profilePicture = (
      <View style={styles.initialContainer}>
        <Text style={styles.initial}>{initial}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {backgroundPicture}
      {profilePicture}
    </View>
  );
};

export default AccountPictures;
