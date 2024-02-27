import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { CreatePinNavigatorParamList } from "./CreatePinNavigator";
import EnterPinDetailsScreen from "./EnterPinDetailsScreen";

type EnterPinDetailsScreenContainerProps = {
  navigation: NavigationProp<CreatePinNavigatorParamList>;
  route: RouteProp<CreatePinNavigatorParamList, "EnterPinDetails">;
};

const EnterPinDetailsScreenContainer = ({
  navigation,
  route,
}: EnterPinDetailsScreenContainerProps) => {
  const { selectedImageURI, providedImageAspectRatio } = route.params;

  const [imageAspectRatio, setImageAspectRatio] = useState(
    providedImageAspectRatio,
  );

  const [pinTitle, setPinTitle] = useState("");
  const [pinDescription, setPinDescription] = useState("");

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

  return (
    <EnterPinDetailsScreen
      selectedImageURI={selectedImageURI}
      imageAspectRatio={imageAspectRatio}
      pinTitle={pinTitle}
      pinDescription={pinDescription}
      handleChangePinTitle={setPinTitle}
      handleChangePinDescription={setPinDescription}
      handlePressBack={navigation.goBack}
    />
  );
};

export default EnterPinDetailsScreenContainer;
