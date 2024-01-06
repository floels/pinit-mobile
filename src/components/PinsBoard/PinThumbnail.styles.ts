import { StyleSheet } from "react-native";

import { Fonts } from "@/src/global.styles";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    borderRadius: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: Fonts.fontSize100,
    fontWeight: "500",
  },
});

export default styles;
