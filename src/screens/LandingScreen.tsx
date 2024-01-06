import { NavigationProp } from "@react-navigation/native";
import { View } from "react-native";

import styles from "./LandingScreen.styles";
import LandingScreenContent from "../components/LandingScreen/LandingScreenContent";
import LandingScreenGallery from "../components/LandingScreen/LandingScreenGallery";
import LandingScreenGradient from "../components/LandingScreen/LandingScreenGradient";
import { UnauthenticatedNavigatorParamList } from "../navigators/UnauthenticatedNavigator";

type LandingScreenProps = {
  navigation: NavigationProp<UnauthenticatedNavigatorParamList>;
};

const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const handlePressLogIn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <LandingScreenGallery />
      <LandingScreenGradient />
      <LandingScreenContent handlePressLogIn={handlePressLogIn} />
    </View>
  );
};

export default LandingScreen;
