import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

import styles from "./HomeScreen.styles";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>{t("HomeScreen.ALL")}</Text>
        </View>
      </View>
      <PinsBoardContainer />
    </View>
  );
};

export default HomeScreen;
