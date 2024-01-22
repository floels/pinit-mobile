import { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";

type SpinnerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const SPIN_DURATION = 2000;

const Spinner = ({ containerStyle, children }: SpinnerProps) => {
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
    <View style={containerStyle}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default Spinner;
