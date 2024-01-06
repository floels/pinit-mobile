import { StyleSheet } from "react-native";

import { Colors, Fonts } from "../globalStyles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logOutButton: {
    backgroundColor: Colors.backgroundImportant,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 60,
  },
  logOutButtonText: {
    fontSize: Fonts.fontSize200,
    color: Colors.fontImportant,
    fontWeight: Fonts.fontWeightSemiBold,
  },
});

export default styles;
