import { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";

import styles from "./PinThumbnail.styles";

import { PinType } from "@/src/lib/types";
import { ellipsizeText } from "@/src/lib/utils/strings";

type PinThumbnailProps = {
  pin: PinType;
  width: number;
};

const MAX_CHARACTERS_TITLE = 80;

const PinThumbnail = ({ pin, width }: PinThumbnailProps) => {
  const [imageHeight, setImageHeight] = useState(0);

  const { title, imageURL } = pin;

  useEffect(() => {
    Image.getSize(imageURL, (originalWidth, originalHeight) => {
      const scaleFactor = originalWidth / width;
      const imageHeight = originalHeight / scaleFactor;
      setImageHeight(imageHeight);
    });
  }, []);

  if (!imageHeight) {
    return null;
  }

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: pin.imageURL }}
        style={[styles.image, { width, height: imageHeight }]}
      />
      <Text style={styles.title}>
        {ellipsizeText({ text: title, maxLength: MAX_CHARACTERS_TITLE })}
      </Text>
    </View>
  );
};

export default PinThumbnail;
