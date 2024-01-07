import {
  ScrollView,
  View,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import PinThumbnail from "./PinThumbnail";
import styles from "./PinsBoard.styles";
import Spinner from "../Spinner/Spinner";

import { PinType } from "@/src/lib/types";

type PinsBoardProps = {
  pins: PinType[];
  isFetching: boolean;
  fetchError: string;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const NUMBER_COLUMNS = 2;
const MARGIN_BETWEEN_COLUMNS = 10;
const SCROLL_EVENT_THROTTLE = 32;

const PinsBoard = ({
  pins,
  isFetching,
  fetchError,
  handleScroll,
}: PinsBoardProps) => {
  const screenWidth = Dimensions.get("window").width;

  // For N columns, we want (N+1) margins total on the screen,
  // counting the one at the far left and the one at the far right
  // of the screen. Therefore we should set:
  const columnWidth =
    (screenWidth - (NUMBER_COLUMNS + 1) * MARGIN_BETWEEN_COLUMNS) /
    NUMBER_COLUMNS;

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      testID="pins-board-scroll-view"
    >
      <View style={styles.thumbnailsGrid}>
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
      </View>
      {isFetching && (
        <Spinner style={styles.spinner} testID="pins-board-spinner" />
      )}
      {fetchError && (
        <View style={styles.error}>
          <FontAwesome5
            name="exclamation-circle"
            style={styles.errorIcon}
            size={20}
          />
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PinsBoard;
