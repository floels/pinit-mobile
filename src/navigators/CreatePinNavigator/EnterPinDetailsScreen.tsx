import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./EnterPinDetailsScreen.styles";

type EnterPinDetailsScreenProps = {
  selectedImageURI: string;
  imageAspectRatio: number | null;
  pinTitle: string;
  pinDescription: string;
  handleChangePinTitle: (title: string) => void;
  handleChangePinDescription: (description: string) => void;
  handlePressBack: () => void;
};

const IMAGE_WIDTH = 100;

const EnterPinDetailsScreen = ({
  selectedImageURI,
  imageAspectRatio,
  pinTitle,
  pinDescription,
  handleChangePinTitle,
  handleChangePinDescription,
  handlePressBack,
}: EnterPinDetailsScreenProps) => {
  const { t } = useTranslation();

  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePressBack} style={styles.backButton}>
        <FontAwesome5Icon name="chevron-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{t("CreatePin.CREATE_A_PIN")}</Text>
    </View>
  );

  if (imageAspectRatio === null) {
    // Display only the header while we are fetching the image's aspect ratio:
    return header;
  }

  const imageHeight = IMAGE_WIDTH / imageAspectRatio;

  return (
    <View style={styles.container}>
      {header}
      <Image
        source={{ uri: selectedImageURI }}
        style={styles.pinImage}
        width={IMAGE_WIDTH}
        height={imageHeight}
      />
      <View style={styles.pinTitleLabelAndInput}>
        <Text style={styles.formLabel}>{t("CreatePin.LABEL_PIN_TITLE")}</Text>
        <TextInput
          placeholder={t("CreatePin.PLACEHOLDER_PIN_TITLE")}
          onChangeText={handleChangePinTitle}
          value={pinTitle}
          style={styles.pinTitleInput}
        />
      </View>
      <View style={styles.pinDescriptionLabelAndInput}>
        <Text style={styles.formLabel}>
          {t("CreatePin.LABEL_PIN_DESCRIPTION")}
        </Text>
        <TextInput
          placeholder={t("CreatePin.PLACEHOLDER_PIN_DESCRIPTION")}
          onChangeText={handleChangePinDescription}
          value={pinDescription}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            {t("CreatePin.SUBMIT_BUTTON_TEXT")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterPinDetailsScreen;
