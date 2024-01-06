import { Text, View, TouchableOpacity, TextInput } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import styles from "./LoginScreen.styles";

type LoginScreenProps = {
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;
  isPasswordVisible: boolean;
  onTogglePasswordVisibility: () => void;
  onSubmit: () => void;
  onPressClose: () => void;
};

const LoginScreen = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  isPasswordVisible,
  onTogglePasswordVisibility,
  onSubmit,
  onPressClose,
}: LoginScreenProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.closeIconAndHeader}>
        <TouchableOpacity onPress={onPressClose} style={styles.closeIcon}>
          <FontAwesome5 name="times" size={24} />
        </TouchableOpacity>
        <Text style={styles.header}>{t("LandingScreen.LOG_IN")}</Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.emailLabelAndInput}>
          <Text>{t("LandingScreen.LABEL_EMAIL")}</Text>
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder={t("LandingScreen.PLACEHOLDER_EMAIL")}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.emailInput}
          />
        </View>
        <View style={styles.passwordLabelAndInput}>
          <Text>{t("LandingScreen.LABEL_PASSWORD")}</Text>
          <View style={styles.passwordInputAndVisibilityIcon}>
            <TextInput
              value={password}
              onChangeText={onChangePassword}
              placeholder={t("LandingScreen.PLACEHOLDER_PASSWORD")}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={onTogglePasswordVisibility}>
              <FontAwesome5
                name="eye"
                size={24}
                style={styles.togglePasswordVisibilityIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            {t("LandingScreen.LOG_IN")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
