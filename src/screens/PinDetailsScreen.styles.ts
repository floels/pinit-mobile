import { StyleSheet } from "react-native";
import { Colors } from "../global.styles";

export const SIDE_PADDING = 6;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: SIDE_PADDING,
    paddingRight: SIDE_PADDING,
    backgroundColor: "black",
    flex: 1,
  },
  content: {
    position: "relative",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.backgroundBase,
    flex: 1,
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: 20,
    left: 20,
  },
  backButtonIcon: {
    color: "white",
  },
  image: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default styles;
