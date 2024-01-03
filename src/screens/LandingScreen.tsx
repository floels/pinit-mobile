import { View } from "react-native";
import LandingScreenContent from "../components/LandingScreen/LandingScreenContent";
import styles from "./LandingScreen.styles";

type LandingScreenProps = {
  handlePressLogIn: () => void;
};

const LandingScreen = ({ handlePressLogIn }: LandingScreenProps) => {
  return (
    <View style={styles.container}>
      <LandingScreenContent handlePressLogIn={handlePressLogIn} />
    </View>
  );
};

export default LandingScreen;
