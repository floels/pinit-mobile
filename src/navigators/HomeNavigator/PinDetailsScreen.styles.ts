import { StyleSheet } from "react-native";

import { Colors } from "@/src/global.styles";

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
  backButtonIcon: {
    color: Colors.fontImportant,
  },
});

export default styles;
