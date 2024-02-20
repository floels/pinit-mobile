import { NavigationProp } from "@react-navigation/native";
import { View } from "react-native";

import styles from "./HomeBaseScreen.styles";

import AccessTokenRefresher from "@/src/components/HomeScreen/AccessTokenRefresher";
import PinsBoardContainer from "@/src/components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_PIN_SUGGESTIONS } from "@/src/lib/constants";
import { Pin } from "@/src/lib/types";
import { HomeNavigatorParamList } from "@/src/navigators/HomeNavigator";

type HomeScreenProps = {
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const HomeBaseScreen = ({ navigation }: HomeScreenProps) => {
  const getTapHandlerForPin = ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: Pin;
    pinImageAspectRatio: number;
  }) => {
    return () => {
      navigation.navigate("PinDetails", { pin, pinImageAspectRatio });
    };
  };

  return (
    <View style={styles.container}>
      <AccessTokenRefresher />
      <PinsBoardContainer
        fetchEndpoint={`${API_ENDPOINT_PIN_SUGGESTIONS}/`}
        shouldAuthenticate
        getTapHandlerForPin={getTapHandlerForPin}
      />
    </View>
  );
};

export default HomeBaseScreen;
