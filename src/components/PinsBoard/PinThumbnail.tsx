import { View, Image, Text } from "react-native";

import styles from "./PinThumbnail.styles";

import { PinWithAuthorDetails } from "@/src/lib/types";
import { ellipsizeText } from "@/src/lib/utils/strings";

type PinThumbnailProps = {
  pin: PinWithAuthorDetails;
  width: number;
  pinImageAspectRatio: number;
};

const MAX_CHARACTERS_TITLE = 80;

const PinThumbnail = ({
  pin,
  width,
  pinImageAspectRatio,
}: PinThumbnailProps) => {
  let displayAuthorData;

  const hasAuthorProfilePicture = !!pin.authorProfilePictureURL;

  if (hasAuthorProfilePicture) {
    displayAuthorData = (
      <View style={styles.authorData}>
        <Image
          source={{ uri: pin.authorProfilePictureURL }}
          style={styles.authorProfilePicture}
          testID="pin-thumbnail-author-profile-picture"
        />
        <Text style={styles.authorName}>{pin.authorDisplayName}</Text>
      </View>
    );
  } else {
    displayAuthorData = (
      <Text style={styles.authorName}>{pin.authorDisplayName}</Text>
    );
  }

  const pinImageHeight = width / pinImageAspectRatio;

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: pin.imageURL }}
        width={width}
        height={pinImageHeight}
        style={styles.image}
        testID="pin-thumbnail-pin-image"
      />
      <Text style={styles.title}>
        {ellipsizeText({ text: pin.title, maxLength: MAX_CHARACTERS_TITLE })}
      </Text>
      {displayAuthorData}
    </View>
  );
};

export default PinThumbnail;
