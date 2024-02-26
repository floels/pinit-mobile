import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Text } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { CreatePinNavigatorParamList } from "./CreatePinNavigator";
import styles from "./SelectPinImageScreen.styles";

import CameraRollViewContainer from "@/src/components/SelectPinImageScreen/CameraRollViewContainer";

type SelectPinImageScreenProps = {
  handlePressClose: () => void;
  navigation: NavigationProp<CreatePinNavigatorParamList>;
};

const SelectPinImageScreen = ({
  handlePressClose,
  navigation,
}: SelectPinImageScreenProps) => {
  const { t } = useTranslation();

  const handlePressNext = () => {
    navigation.navigate("EnterPinDetails", { selectedImageURI: "" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
          <FontAwesome5Icon name="times" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressNext}>
          <Text>{t("CreatePin.NEXT")}</Text>
        </TouchableOpacity>
      </View>
      <CameraRollViewContainer />
    </View>
  );
};

export default SelectPinImageScreen;
