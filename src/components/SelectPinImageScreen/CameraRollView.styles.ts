import { StyleSheet } from "react-native";

export const SPACE_BETWEEN_COLUMNS = 1;

const styles = StyleSheet.create({
  image: {
    marginBottom: 1,
  },
  imageNotInLastColumn: {
    marginRight: SPACE_BETWEEN_COLUMNS,
  },
});

export default styles;
