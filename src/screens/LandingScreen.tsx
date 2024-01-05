import { View } from "react-native";
import LandingScreenContent from "../components/LandingScreen/LandingScreenContent";
import styles from "./LandingScreen.styles";
import LandingScreenGallery from "../components/LandingScreen/LandingScreenGallery";
import LandingScreenGradient from "../components/LandingScreen/LandingScreenGradient";
import { NavigationProp } from "@react-navigation/native";
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
