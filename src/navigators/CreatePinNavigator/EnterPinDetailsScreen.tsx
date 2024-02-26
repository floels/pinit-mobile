import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { CreatePinNavigatorParamList } from "./CreatePinNavigator";
import styles from "./EnterPinDetailsScreen.styles";

type EnterPinDetailsScreenProps = {
  navigation: NavigationProp<CreatePinNavigatorParamList>;
  route: RouteProp<CreatePinNavigatorParamList, "EnterPinDetails">;
};

const IMAGE_WIDTH = 100;

const EnterPinDetailsScreen = ({
  navigation,
  route,
}: EnterPinDetailsScreenProps) => {
  const { t } = useTranslation();

  const { selectedImageURI, providedImageAspectRatio } = route.params;

  const [imageAspectRatio, setImageAspectRatio] = useState(
    providedImageAspectRatio,
  );

  // Fetch the image's aspect ratio in case it wasn't provided by the
  // previous screen (can happen if user clicks 'Next' really quickly
  // after selecting the image):
  useEffect(() => {
    if (providedImageAspectRatio === null) {
      Image.getSize(selectedImageURI, (width, height) => {
        setImageAspectRatio(width / height);
      });
    }
  }, [providedImageAspectRatio]);

  const hasImageAspectRatio = imageAspectRatio !== null;

  let displayForm;

  if (hasImageAspectRatio) {
    const imageHeight = IMAGE_WIDTH / imageAspectRatio;

    displayForm = (
      <Image
        source={{ uri: selectedImageURI }}
        style={styles.pinImage}
        width={IMAGE_WIDTH}
        height={imageHeight}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <FontAwesome5Icon name="chevron-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{t("CreatePin.CREATE_A_PIN")}</Text>
      </View>
      {displayForm}
    </View>
  );
};

export default EnterPinDetailsScreen;
