import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../globalStyles";

const buttonsHeight = 40;
const buttonsBorderRadius = 60;
const buttonTextsFontSize = 16;
const buttonTextsFontWeight = Fonts.fontWeightSemiBold;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    flex: 1,
  },
  header: {
    fontSize: Fonts.fontSize400,
    fontWeight: Fonts.fontWeightSemiBold,
    marginBottom: 24,
  },
  signUpButton: {
    backgroundColor: Colors.backgroundPrimary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: buttonsHeight,
    borderRadius: buttonsBorderRadius,
    marginBottom: 12,
  },
  signUpButtonText: {
    fontSize: buttonTextsFontSize,
    color: Colors.fontSecondary,
    fontWeight: buttonTextsFontWeight,
  },
  logInButton: {
    backgroundColor: Colors.backgroundSecondary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: buttonsHeight,
    borderRadius: buttonsBorderRadius,
  },
  logInButtonText: {
    fontSize: buttonTextsFontSize,
    fontWeight: buttonTextsFontWeight,
  },
});

export default styles;
