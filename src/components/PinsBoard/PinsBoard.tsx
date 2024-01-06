import { ScrollView, View, Dimensions } from "react-native";

import PinThumbnail from "./PinThumbnail";
import styles from "./PinsBoard.styles";

import { PinType } from "@/src/lib/types";

type PinsBoardProps = {
  pins: PinType[];
};

const NUMBER_COLUMNS = 2;
const MARGIN_BETWEEN_COLUMNS = 10;

const PinsBoard = ({ pins }: PinsBoardProps) => {
  const screenWidth = Dimensions.get("window").width;

  const columnWidth = screenWidth / NUMBER_COLUMNS - MARGIN_BETWEEN_COLUMNS;

  // Here the logic is to:
  // - render as many columns as `NUMBER_COLUMNS`,
  // - then, render the thumbnails in rows, e.g. if we have 3 columns:
  //   - thumbnail #1 goes to column #1,
  //   - thumbnail #2 goes to column #2,
  //   - thumbnail #3 goes to column #3,
  //   - thumbnail #4 goes to column #1, etc.
  // We do this by conditioning the rendering of thumbnail #pinThumbnailIndex (zero-based) to:
  // `if (pinThumbnailIndex % NUMBER_COLUMNS === columnIndex)`.
  return (
    <ScrollView contentContainerStyle={styles.thumbnailsGrid}>
      {Array.from({ length: NUMBER_COLUMNS }).map((_, columnIndex) => (
        <View key={`thumbnails-column-${columnIndex + 1}`}>
          {pins.map((pin, pinIndex) => {
            if (pinIndex % NUMBER_COLUMNS === columnIndex) {
              return (
                <View key={`pin-thumbnail-${pinIndex + 1}`}>
                  <PinThumbnail pin={pin} width={columnWidth} />
                </View>
              );
            }
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default PinsBoard;
