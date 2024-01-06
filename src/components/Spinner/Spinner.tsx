import { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./Spinner.styles";

type SpinnerProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SPIN_DURATION = 2000;

const Spinner = ({ style, testID }: SpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: SPIN_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={style} testID={testID}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome5 name="spinner" size={40} style={styles.icon} />
      </Animated.View>
    </View>
  );
};

export default Spinner;
