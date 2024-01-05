import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../globalStyles";

const styles = StyleSheet.create({
  closeIconAndHeader: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  header: {
    fontSize: Fonts.fontSize200,
    fontWeight: Fonts.fontWeightSemiBold,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  submitButton: {
    backgroundColor: Colors.backgroundPrimary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 60,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: Fonts.fontSize200,
    fontWeight: Fonts.fontWeightSemiBold,
  },
});

export default styles;
