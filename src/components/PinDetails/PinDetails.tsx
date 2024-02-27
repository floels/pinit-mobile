import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles, { SIDE_PADDING } from "./PinDetails.styles";

import { PinWithAuthorDetails } from "@/src/lib/types";

type PinDetailsProps = {
  pin: PinWithAuthorDetails;
  pinImageAspectRatio: number;
  handlePressAuthor: () => void;
};

const PinDetails = ({
  pin,
  pinImageAspectRatio,
  handlePressAuthor,
}: PinDetailsProps) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - 2 * SIDE_PADDING;
  const pinImageHeight = imageWidth / pinImageAspectRatio;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: pin.imageURL }}
          style={[
            styles.pinImage,
            { width: imageWidth, height: pinImageHeight },
          ]}
        />
        <TouchableOpacity onPress={handlePressAuthor} style={styles.authorData}>
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
  );
};

export default PinDetails;
