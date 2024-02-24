import { NavigationProp } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { AuthenticatedNavigatorParamList } from "@/src/navigators/AuthenticatedNavigator/AuthenticatedNavigator";
import styles from "./CreatePinScreen.styles";

type CreatePinScreenProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatePinScreen = ({ navigation }: CreatePinScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <FontAwesome5Icon name="times" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePinScreen;
