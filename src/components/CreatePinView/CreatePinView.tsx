import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import CameraRollViewContainer from "./CameraRollViewContainer";
import styles from "./CreatePinView.styles";

type CreatePinViewProps = {
  handlePressClose: () => void;
};

const CreatePinView = ({ handlePressClose }: CreatePinViewProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
        <FontAwesome5Icon name="times" size={24} />
      </TouchableOpacity>
      <CameraRollViewContainer />
    </View>
  );
};

export default CreatePinView;
