import { View, Image, Text } from "react-native";

import styles from "./PinThumbnail.styles";

import { PinType } from "@/src/lib/types";
import { ellipsizeText } from "@/src/lib/utils/strings";

type PinThumbnailProps = {
  pin: PinType;
  pinImageAspectRatio: number | null;
  width: number;
};

const MAX_CHARACTERS_TITLE = 80;

const PinThumbnail = ({
  pin,
  pinImageAspectRatio,
  width,
}: PinThumbnailProps) => {
  const defaultedPinImageAspectRatio = pinImageAspectRatio || 1;

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: pin.imageURL }}
        style={[
          styles.image,
          { width, height: width / defaultedPinImageAspectRatio },
        ]}
      />
      <Text style={styles.title}>
        {ellipsizeText({ text: pin.title, maxLength: MAX_CHARACTERS_TITLE })}
      </Text>
    </View>
  );
};

export default PinThumbnail;
