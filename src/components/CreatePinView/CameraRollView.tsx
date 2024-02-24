import { Asset } from "expo-media-library";
import { FlatList, Image } from "react-native";

type CameraRollViewProps = {
  cameraRollPhotos: Asset[];
};

const NUMBER_COLUMNS = 4;

const CameraRollView = ({ cameraRollPhotos }: CameraRollViewProps) => {
  return (
    <FlatList
      data={cameraRollPhotos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} width={50} height={50} />
      )}
      numColumns={NUMBER_COLUMNS}
    />
  );
};

export default CameraRollView;
