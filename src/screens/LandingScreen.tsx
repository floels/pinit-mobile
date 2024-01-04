import { View } from "react-native";
import LandingScreenContent from "../components/LandingScreen/LandingScreenContent";
import styles from "./LandingScreen.styles";
import LandingScreenGallery from "../components/LandingScreen/LandingScreenGallery";

type LandingScreenProps = {
  handlePressLogIn: () => void;
};

const LandingScreen = ({ handlePressLogIn }: LandingScreenProps) => {
  return (
    <View style={styles.container}>
      <LandingScreenGallery />
      <LandingScreenContent handlePressLogIn={handlePressLogIn} />
    </View>
  );
};

export default LandingScreen;
