import { Text, View, Button } from "react-native";
import { useTranslation } from "react-i18next";

type LandingScreenProps = {
  handlePressLogIn: () => void;
};

const LandingScreen = ({ handlePressLogIn }: LandingScreenProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("LandingScreen.WELCOME")}</Text>
      <Button onPress={handlePressLogIn} title="Log in" />
    </View>
  );
};

export default LandingScreen;
