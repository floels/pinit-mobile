import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../globalStyles";

const inputsFontSize = Fonts.fontSize400;
const inputsFontWeight = Fonts.fontWeightSemiBold;

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
  loginForm: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
  emailLabelAndInput: {
    marginBottom: 30,
  },
  emailInput: {
    fontSize: inputsFontSize,
    fontWeight: inputsFontWeight,
  },
  passwordLabelAndInput: {
    marginBottom: 30,
  },
  passwordInputAndVisibilityIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    fontSize: inputsFontSize,
    fontWeight: inputsFontWeight,
    flex: 1,
  },
  togglePasswordVisibilityIcon: {
    color: Colors.fontSecondary,
  },
  submitButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 60,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.backgroundNormal,
  },
  submitButtonEnabled: {
    backgroundColor: Colors.backgroundImportant,
  },
  submitButtonText: {
    fontSize: Fonts.fontSize200,
    fontWeight: Fonts.fontWeightSemiBold,
  },
  submitButtonTextDisabled: {
    color: Colors.fontSecondary,
  },
  submitButtonTextEnabled: {
    color: Colors.fontImportant,
  },
});

export default styles;
