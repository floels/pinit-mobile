import { Asset } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import CameraRollView from "./CameraRollView";

const NUMBER_CAMERA_ROLL_PHOTOS_DISPLAYED = 500;

const CameraRollViewContainer = () => {
  const { t } = useTranslation();

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

  if (refusedCameraRollAccess) {
    return (
      <View>
        <FontAwesome5Icon name="exclamation-triangle" size={24} />
        <Text>{t("CreatePinScreen.CAMERA_ROLL_ACCESS_REQUIRED")}</Text>
      </View>
    );
  }

  return <CameraRollView cameraRollPhotos={cameraRollPhotos} />;
};

export default CameraRollViewContainer;
