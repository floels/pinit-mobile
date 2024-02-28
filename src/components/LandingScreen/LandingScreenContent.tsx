import { useTranslation } from "react-i18next";
import { Text, View, TouchableOpacity, Image } from "react-native";

import styles from "./LandingScreenContent.styles";

import logo from "@/assets/logo.png";

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
      <TouchableOpacity onPress={handlePressLogIn} style={styles.logInButton}>
        <Text style={styles.logInButtonText}>{t("LandingScreen.LOG_IN")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreenContent;
