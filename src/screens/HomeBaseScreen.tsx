import { View } from "react-native";

import styles from "./HomeBaseScreen.styles";
import AccessTokenRefresher from "../components/HomeScreen/AccessTokenRefresher";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_PIN_SUGGESTIONS } from "../lib/constants";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <AccessTokenRefresher />
      <PinsBoardContainer
        fetchEndpoint={`${API_ENDPOINT_PIN_SUGGESTIONS}/`}
        shouldAuthenticate
      />
    </View>
  );
};

export default HomeScreen;
