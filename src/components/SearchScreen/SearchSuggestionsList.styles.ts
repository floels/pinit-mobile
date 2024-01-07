import { Fonts } from "@/src/global.styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  suggestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  suggestionIcon: {
    marginRight: 20,
  },
  suggestionText: {
    fontSize: Fonts.fontSize200,
  },
});

export default styles;
