import { StyleSheet } from "react-native";

import { Colors } from "@/src/global.styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
  },
  thumbnailsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  spinner: {
    marginTop: 60,
    marginBottom: 60,
  },
  error: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  errorIcon: {
    color: Colors.fontWarning,
    marginRight: 6,
  },
  errorText: {
    textAlign: "center",
    color: Colors.fontWarning,
  },
});

export default styles;
