import { StyleSheet } from "react-native";

import { Colors, Fonts } from "../global.styles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInputAndCancelButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: Colors.backgroundNormal,
    borderRadius: 20,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    fontWeight: Fonts.fontWeightSemiBold,
  },
});

export default styles;
