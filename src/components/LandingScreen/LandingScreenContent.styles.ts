import { StyleSheet } from "react-native";

import { Colors, Fonts } from "../../globalStyles";

const buttonsHeight = 40;
const buttonsBorderRadius = 60;
const buttonTextsFontSize = Fonts.fontSize200;
const buttonTextsFontWeight = Fonts.fontWeightSemiBold;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    position: "relative",
    backgroundColor: Colors.backgroundBase,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
    position: "absolute",
    top: -45, // 50% of height
    alignSelf: "center",
  },
  header: {
    fontSize: Fonts.fontSize400,
    fontWeight: Fonts.fontWeightSemiBold,
    marginBottom: 24,
  },
  signUpButton: {
    backgroundColor: Colors.backgroundImportant,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: buttonsHeight,
    borderRadius: buttonsBorderRadius,
    marginBottom: 12,
  },
  signUpButtonText: {
    fontSize: buttonTextsFontSize,
    color: Colors.fontImportant,
    fontWeight: buttonTextsFontWeight,
  },
  logInButton: {
    backgroundColor: Colors.backgroundNormal,
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
