import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Asset } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";

import { CreatePinNavigatorParamList } from "./CreatePinNavigator";
import SelectPinImageScreen from "./SelectPinImageScreen";

type SelectPinImageScreenContainerProps = {
  handlePressClose: () => void;
  navigation: NavigationProp<CreatePinNavigatorParamList>;
};

const NUMBER_CAMERA_ROLL_PHOTOS_DISPLAYED = 500;

const SelectPinImageScreenContainer = ({
  handlePressClose,
  navigation,
}: SelectPinImageScreenContainerProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Un-select the image when user navigates back from "EnterPinDetailsScreen"
  // to this screen:
  useFocusEffect(
    useCallback(() => {
      setSelectedImageIndex(null);
    }, []),
  );

  const [selectedImageAspectRatio, setSelectedImageAspectRatio] = useState<
    number | null
  >(null);

  const [cameraRollPhotos, setCameraRollPhotos] = useState<Asset[]>([]);

  const [
    cameraRollAccessPermissionResponse,
    requestCameraRollAccessPermission,
  ] = MediaLibrary.usePermissions();

  const [refusedCameraRollAccess, setRefusedCameraRollAccess] = useState(false);

  const getCameraRollPhotos = async () => {
    if (cameraRollAccessPermissionResponse?.accessPrivileges !== "all") {
      const { status } = await requestCameraRollAccessPermission();

      if (status !== "granted") {
        setRefusedCameraRollAccess(true);
        return;
      }
    }

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: NUMBER_CAMERA_ROLL_PHOTOS_DISPLAYED,
    });

    setCameraRollPhotos(assets);
  };

  useEffect(() => {
    getCameraRollPhotos();
  }, []);

  const handlePressNext = () => {
    if (selectedImageIndex === null) {
      return;
    }

    navigation.navigate("EnterPinDetails", {
      selectedImageURI: cameraRollPhotos[selectedImageIndex].uri,
      providedImageAspectRatio: selectedImageAspectRatio,
    });
  };

  const getPressHandlerForImage =
    ({ imageIndex }: { imageIndex: number }) =>
    () => {
      const isImageAlreadySelected = imageIndex === selectedImageIndex;

      if (isImageAlreadySelected) {
        setSelectedImageIndex(null);
        setSelectedImageAspectRatio(null);
      } else {
        setSelectedImageIndex(imageIndex);
        Image.getSize(
          cameraRollPhotos[imageIndex].uri,
          (width: number, height: number) => {
            setSelectedImageAspectRatio(width / height);
          },
        );
      }
    };

  return (
    <SelectPinImageScreen
      refusedCameraRollAccess={refusedCameraRollAccess}
      cameraRollPhotos={cameraRollPhotos}
      selectedImageIndex={selectedImageIndex}
      getPressHandlerForImage={getPressHandlerForImage}
      handlePressClose={handlePressClose}
      handlePressNext={handlePressNext}
    />
  );
};

export default SelectPinImageScreenContainer;
