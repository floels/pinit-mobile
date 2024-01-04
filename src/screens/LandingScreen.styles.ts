import { StyleSheet } from "react-native";
import { Colors } from "@/src/globalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: "flex-end",
    position: "relative", // because the container of <LandingScreenGallery /> will have 'position: absolute;'
  },
});

export default styles;
