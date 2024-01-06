import { StyleSheet } from "react-native";

import { Colors } from "@/src/global.styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundBase,
    flex: 1,
    justifyContent: "flex-end",
    position: "relative", // because the container of <LandingScreenGallery /> will have 'position: absolute;'
  },
});

export default styles;
