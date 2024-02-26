import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as MediaLibrary from "expo-media-library";

import styles from "./CreatePinView.styles";
import { useEffect, useState } from "react";
import { Asset } from "expo-media-library";
import CameraRollView from "./CameraRollView";

type CreatePinViewProps = {
  handlePressClose: () => void;
};

const NUMBER_PHOTOS_FROM_CAMERA_ROLL = 50;

const CreatePinView = ({ handlePressClose }: CreatePinViewProps) => {
  const [cameraRollPhotos, setCameraRollPhotos] = useState<Asset[]>([]);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getCameraRollPhotos = async () => {
    if (permissionResponse?.accessPrivileges !== "all") {
      const { status } = await requestPermission();

      if (status !== "granted") {
        alert("We need camera roll permissions to allow you to create a pin.");

        return;
      }
    }

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 50,
    });

    setCameraRollPhotos(assets);
  };

  useEffect(() => {
    getCameraRollPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressClose}>
        <FontAwesome5Icon name="times" size={24} />
      </TouchableOpacity>
      <CameraRollView cameraRollPhotos={cameraRollPhotos} />
    </View>
  );
};

export default CreatePinView;
