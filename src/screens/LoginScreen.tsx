import { Text, View, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { UnauthenticatedNavigatorParamList } from "../navigators/UnauthenticatedNavigator";
import { useTranslation } from "react-i18next";
import styles from "./LoginScreen.styles";

type LoginScreenProps = {
  navigation: NavigationProp<UnauthenticatedNavigatorParamList>;
  handleSubmitLogin: () => void;
};

const LoginScreen = ({ navigation, handleSubmitLogin }: LoginScreenProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.closeIconAndHeader}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.closeIcon}>
          <FontAwesome5 name="times" size={24} />
        </TouchableOpacity>
        <Text style={styles.header}>{t("LandingScreen.LOG_IN")}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={handleSubmitLogin}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            {t("LandingScreen.LOG_IN")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
