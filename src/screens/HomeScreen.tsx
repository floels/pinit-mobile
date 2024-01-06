import { View, TouchableOpacity, Text } from "react-native";
import styles from "./HomeScreen.styles";
import { useTranslation } from "react-i18next";

type HomeScreenProps = {
  handlePressLogOut: () => void;
};

const HomeScreen = ({ handlePressLogOut }: HomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressLogOut} style={styles.logOutButton}>
        <Text style={styles.logOutButtonText}>{t("HomeScreen.LOG_OUT")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
