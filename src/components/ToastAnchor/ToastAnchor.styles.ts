import { StyleSheet } from "react-native";

import { Colors } from "@/src/global.styles";

const styles = StyleSheet.create({
  pinCreationErrorContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: Colors.fontWarning,
    backgroundColor: Colors.backgroundBase,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pinCreationErrorIcon: {
    marginRight: 10,
    color: Colors.fontWarning,
  },
});

export default styles;
