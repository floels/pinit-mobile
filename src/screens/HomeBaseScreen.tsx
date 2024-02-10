import { View } from "react-native";

import styles from "./HomeBaseScreen.styles";
import AccessTokenRefresher from "../components/HomeScreen/AccessTokenRefresher";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_PIN_SUGGESTIONS } from "../lib/constants";
import { PinType } from "@/src/lib/types";
import { NavigationProp } from "@react-navigation/native";
import { HomeNavigatorParamList } from "../navigators/HomeNavigator";

type HomeScreenProps = {
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const HomeBaseScreen = ({ navigation }: HomeScreenProps) => {
  const getTapHandlerForPin = ({ pin }: { pin: PinType }) => {
    return () => {
      navigation.navigate("PinDetails", { pin });
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
