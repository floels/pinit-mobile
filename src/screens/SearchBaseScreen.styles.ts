import { StyleSheet } from "react-native";

import { Colors } from "../global.styles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchIconAndInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundNormal,
    borderRadius: 20,
  },
  searchIcon: {
    color: Colors.fontSecondary,
    marginLeft: 12,
    marginRight: 8,
  },
  searchInput: {
    color: Colors.fontSecondary,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default styles;
