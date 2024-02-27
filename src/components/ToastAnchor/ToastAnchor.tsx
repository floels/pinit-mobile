import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./ToastAnchor.styles";

// https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md
const toastConfig = {
  pinCreationError: ({ text1 }: { text1?: string }) => (
    <View style={styles.pinCreationErrorContainer}>
      <FontAwesome5Icon
        name="exclamation-circle"
        size={24}
        style={styles.pinCreationErrorIcon}
      />
      <Text>{text1}</Text>
    </View>
  ),
};

const ToastAnchor = () => {
  return <Toast config={toastConfig} />;
};

export default ToastAnchor;
