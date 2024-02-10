import { View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./LoadingOverlay.styles";

import Spinner from "@/src/components/Spinner/Spinner";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <Spinner>
        <FontAwesome5 name="spinner" size={40} style={styles.spinnerIcon} />
      </Spinner>
    </View>
  );
};

export default LoadingOverlay;
