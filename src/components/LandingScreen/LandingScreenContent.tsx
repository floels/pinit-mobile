import { Text, View, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import styles from "./LandingScreenContent.styles";

type LandingScreenContentProps = {
  handlePressLogIn: () => void;
};

const LandingScreenContent = ({
  handlePressLogIn,
}: LandingScreenContentProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
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

export default LandingScreenContent;
