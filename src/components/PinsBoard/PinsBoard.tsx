import {
  ScrollView,
  View,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import PinThumbnail from "./PinThumbnail";
import styles from "./PinsBoard.styles";
import Spinner from "../Spinner/Spinner";

import { PinType } from "@/src/lib/types";

type PinsBoardProps = {
  pins: PinType[];
  pinImageAspectRatios: (number | null)[];
  isFetchingMorePins: boolean;
  fetchMorePinsError: string;
  isRefreshing: boolean;
  hasJustRefreshed: boolean;
  refreshError: string;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const NUMBER_COLUMNS = 2;
const MARGIN_BETWEEN_COLUMNS = 10;
const SCROLL_EVENT_THROTTLE = 32;
export const THRESHOLD_PULL_TO_REFRESH = 100;
const SIZE_REFRESH_SPINNER = 40;

const PinsBoard = ({
  pins,
  pinImageAspectRatios,
  isFetchingMorePins,
  fetchMorePinsError,
  isRefreshing,
  hasJustRefreshed,
  refreshError,
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
  const thumbnailsGrid = (
    <View style={styles.thumbnailsGrid}>
      {Array.from({ length: NUMBER_COLUMNS }).map((_, columnIndex) => (
        <View key={`thumbnails-column-${columnIndex + 1}`}>
          {pins.map((pin, pinIndex) => {
            const pinBelongsInThisColumn =
              pinIndex % NUMBER_COLUMNS === columnIndex;

            const pinHasImageAspectRatio = !!pinImageAspectRatios[pinIndex];

            if (pinBelongsInThisColumn && pinHasImageAspectRatio) {
              return (
                <View key={`pin-thumbnail-${pinIndex + 1}`}>
                  <PinThumbnail
                    pin={pin}
                    pinImageAspectRatio={pinImageAspectRatios[pinIndex]}
                    width={columnWidth}
                  />
                </View>
              );
            }
          })}
        </View>
      ))}
    </View>
  );

  const fetchMorePinsSpinner = (
    <Spinner containerStyle={styles.fetchMorePinsSpinner}>
      <FontAwesome5
        name="spinner"
        size={40}
        style={styles.fetchMorePinsSpinnerIcon}
        testID="pins-board-fetch-more-pins-spinner"
      />
    </Spinner>
  );

  const displayFetchMorePinsError = (
    <View style={styles.error}>
      <FontAwesome5
        name="exclamation-circle"
        style={styles.errorIcon}
        size={20}
      />
      <Text style={styles.errorText}>{fetchMorePinsError}</Text>
    </View>
  );

  const scrollAnimatedValue = new Animated.Value(0);

  const refreshSpinnerPreviewScale = scrollAnimatedValue.interpolate({
    inputRange: [-THRESHOLD_PULL_TO_REFRESH, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const refreshSpinnerPreviewOpacity = scrollAnimatedValue.interpolate({
    inputRange: [-THRESHOLD_PULL_TO_REFRESH, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const refreshSpinnerPreviewAngle = scrollAnimatedValue.interpolate({
    inputRange: [-THRESHOLD_PULL_TO_REFRESH, 0],
    outputRange: ["360deg", "0deg"],
    extrapolate: "clamp",
  });

  const updateAnimatedValueOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }],
    { useNativeDriver: false },
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    updateAnimatedValueOnScroll(event);
    handleScroll(event);
  };

  const refreshSpinnerPreview = (
    <Animated.View
      style={[
        styles.refreshSpinnerPreview,
        {
          top: -SIZE_REFRESH_SPINNER,
          transform: [
            {
              scale: refreshSpinnerPreviewScale,
            },
            {
              rotate: refreshSpinnerPreviewAngle,
            },
          ],
          opacity: refreshSpinnerPreviewOpacity,
        },
      ]}
    >
      <FontAwesome5
        name="spinner"
        size={SIZE_REFRESH_SPINNER}
        style={styles.refreshSpinnerPreviewIcon}
      />
    </Animated.View>
  );

  const refreshSpinner = (
    <Spinner>
      <FontAwesome5
        name="spinner"
        size={SIZE_REFRESH_SPINNER}
        style={styles.refreshSpinnerIcon}
      />
    </Spinner>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      scrollEnabled={
        // Disable scroll while refreshing, otherwise it creates
        // a jump when the user continues scrolling down past the
        // refresh threshold:
        !isRefreshing
      }
      testID="pins-board-scroll-view"
    >
      {isRefreshing && refreshSpinner}
      {!isRefreshing && !hasJustRefreshed && refreshSpinnerPreview}
      {thumbnailsGrid}
      {isFetchingMorePins && fetchMorePinsSpinner}
      {fetchMorePinsError && displayFetchMorePinsError}
    </ScrollView>
  );
};

export default PinsBoard;
