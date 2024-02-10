import { NavigationProp } from "@react-navigation/native";
import { View } from "react-native";

import styles from "./HomeBaseScreen.styles";
import AccessTokenRefresher from "../components/HomeScreen/AccessTokenRefresher";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_PIN_SUGGESTIONS } from "../lib/constants";
import { HomeNavigatorParamList } from "../navigators/HomeNavigator";

import { PinType } from "@/src/lib/types";

type HomeScreenProps = {
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const HomeBaseScreen = ({ navigation }: HomeScreenProps) => {
  const getTapHandlerForPin = ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: PinType;
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
