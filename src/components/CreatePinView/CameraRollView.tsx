import { Asset } from "expo-media-library";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { SPACE_BETWEEN_COLUMNS } from "./CameraRollView.styles";

import styles from "./CameraRollView.styles";

type CameraRollViewProps = {
  cameraRollPhotos: Asset[];
};

const NUMBER_COLUMNS = 4;

const CameraRollView = ({ cameraRollPhotos }: CameraRollViewProps) => {
  const screenWidth = Dimensions.get("screen").width;

  const imageWidth =
    (screenWidth - SPACE_BETWEEN_COLUMNS * (NUMBER_COLUMNS - 1)) /
    NUMBER_COLUMNS;

  return (
    <FlatList
      data={cameraRollPhotos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        const isInLastColumn = (index + 1) % NUMBER_COLUMNS === 0;

        const imageStyle = isInLastColumn
          ? styles.image
          : [styles.image, styles.imageNotInLastColumn];

        return (
          <TouchableOpacity style={imageStyle}>
            <Image
              source={{ uri: item.uri }}
              width={imageWidth}
              height={imageWidth}
            />
          </TouchableOpacity>
        );
      }}
      numColumns={NUMBER_COLUMNS}
    />
  );
};

export default CameraRollView;
