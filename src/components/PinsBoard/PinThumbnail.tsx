import { View, Image, Text } from "react-native";

import styles from "./PinThumbnail.styles";

import { Pin } from "@/src/lib/types";
import { ellipsizeText } from "@/src/lib/utils/strings";

type PinThumbnailProps = {
  pin: Pin;
  pinImageAspectRatio: number;
  width: number;
};

const MAX_CHARACTERS_TITLE = 80;

const PinThumbnail = ({
  pin,
  pinImageAspectRatio,
  width,
}: PinThumbnailProps) => {
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: pin.imageURL }}
        style={[styles.image, { width, height: width / pinImageAspectRatio }]}
      />
      <Text style={styles.title}>
        {ellipsizeText({ text: pin.title, maxLength: MAX_CHARACTERS_TITLE })}
      </Text>
    </View>
  );
};

export default PinThumbnail;
