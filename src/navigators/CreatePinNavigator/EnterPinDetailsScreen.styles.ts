import { StyleSheet } from "react-native";

import { Fonts } from "@/src/global.styles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  title: {
    fontWeight: Fonts.fontWeightSemiBold,
    fontSize: Fonts.fontSize200,
  },
  pinImage: {
    borderRadius: 20,
  },
});

export default styles;
