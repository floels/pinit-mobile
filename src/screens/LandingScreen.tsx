import { Text, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./LandingScreen.styles";

type LandingScreenProps = {
  handlePressLogIn: () => void;
};

const LandingScreen = ({ handlePressLogIn }: LandingScreenProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("LandingScreen.WELCOME")}</Text>
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>
          {t("LandingScreen.SIGN_UP")}{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressLogIn} style={styles.logInButton}>
        <Text style={styles.logInButtonText}>{t("LandingScreen.LOG_IN")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;
