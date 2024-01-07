import { StyleSheet } from "react-native";
import { Colors } from "../global.styles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  backButtonAndSearchTerm: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
  },
  backButton: {
    marginRight: 20,
  },
  searchTerm: {
    flex: 1,
    backgroundColor: Colors.backgroundNormal,
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
  },
});

export default styles;
