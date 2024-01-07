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
  searchInputAndClearIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundNormal,
    borderRadius: 20,
    flex: 1,
  },
  searchInput: {
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  clearIcon: {
    marginRight: 12,
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelButtonText: {
    fontWeight: Fonts.fontWeightSemiBold,
  },
});

export default styles;
