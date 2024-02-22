import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles, { SIDE_PADDING } from "./PinDetailsScreen.styles";

import { Pin } from "@/src/lib/types";

type PinDetailsScreenProps = {
  pin: Pin;
  pinImageAspectRatio: number;
  handlePressBack: () => void;
  handlePressAuthor: () => void;
};

const PinDetailsScreen = ({
  pin,
  pinImageAspectRatio,
  handlePressBack,
  handlePressAuthor,
}: PinDetailsScreenProps) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - 2 * SIDE_PADDING;
  const pinImageHeight = imageWidth / pinImageAspectRatio;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
        <FontAwesome5
          name="chevron-left"
          size={20}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
      <ScrollView style={styles.backgroundAndContent}>
        <View style={styles.content}>
          <Image
            source={{ uri: pin.imageURL }}
            style={[
              styles.pinImage,
              { width: imageWidth, height: pinImageHeight },
            ]}
          />
          <TouchableOpacity
            onPress={handlePressAuthor}
            style={styles.authorData}
          >
            <Image
              source={{ uri: pin.authorProfilePictureURL }}
              style={styles.authorProfilePictureImage}
            />
            <Text style={styles.authorName}>{pin.authorDisplayName}</Text>
          </TouchableOpacity>
          <Text style={styles.pinTitle}>{pin.title}</Text>
          <Text style={styles.pinDescription}>{pin.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PinDetailsScreen;
