import { StyleSheet } from "react-native";

import { Colors, Fonts } from "../global.styles";

export const SIDE_PADDING = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: 80,
    left: 26,
  },
  backgroundAndContent: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: SIDE_PADDING,
    paddingRight: SIDE_PADDING,
    backgroundColor: "black",
  },
  content: {
    minHeight: "100%", // For some reason setting 'flex: 1' here doesn't
    // allow to cover the whole bottom of the screen with a white
    // background, in the cases where the pin's content is less than the
    // screen's height.
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.backgroundBase,
    paddingBottom: 80,
  },
  backButtonIcon: {
    color: "white",
  },
  pinImage: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  authorData: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  authorName: {
    fontSize: Fonts.fontSize300,
    fontWeight: Fonts.fontWeightSemiBold,
    paddingRight: 10,
  },
  authorProfilePictureImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 16,
  },
  pinTitle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: Fonts.fontSize300,
    fontWeight: Fonts.fontWeightSemiBold,
    paddingRight: 10,
  },
  pinDescription: {
    marginTop: 6,
    marginLeft: 20,
    paddingRight: 10,
    fontSize: Fonts.fontSize200,
  },
});

export default styles;
