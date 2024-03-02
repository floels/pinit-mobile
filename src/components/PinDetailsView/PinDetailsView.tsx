import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles, { SIDE_PADDING } from "./PinDetailsView.styles";

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
          testID="pin-details-pin-image"
        />
        <View style={styles.pinData}>
          <TouchableOpacity
            onPress={handlePressAuthor}
            style={styles.authorData}
            testID="pin-details-author-data"
          >
            {pin.authorProfilePictureURL && (
              <Image
                source={{ uri: pin.authorProfilePictureURL }}
                style={styles.authorProfilePictureImage}
                testID="pin-details-author-profile-picture"
              />
            )}
            <Text style={styles.authorName}>{pin.authorDisplayName}</Text>
          </TouchableOpacity>
          <Text style={styles.pinTitle}>{pin.title}</Text>
          <Text style={styles.pinDescription}>
            TODO: insert pin description here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PinDetails;
