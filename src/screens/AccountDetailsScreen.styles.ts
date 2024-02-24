import { StyleSheet } from "react-native";

import { Colors, Fonts } from "@/src/global.styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 1,
  },
  backButtonIconWithBackgroundPicture: {
    color: "white",
  },
  backgroundPictureAndProfilePicture: {
    alignItems: "center",
  },
  backgroundPictureImage: {
    height: 240,
  },
  profilePictureImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  profilePictureImageWithBackgroundPicture: {
    marginTop: -70,
    borderWidth: 2,
    borderColor: "white",
  },
  profilePictureImageWithoutBackgroundPicture: {
    marginTop: 80,
  },
  displayName: {
    fontSize: Fonts.fontSize400,
    fontWeight: Fonts.fontWeightSemiBold,
    marginTop: 10,
  },
  logoAndUsername: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    marginRight: 6,
  },
  username: {
    color: Colors.fontSecondary,
  },
});

export default styles;
