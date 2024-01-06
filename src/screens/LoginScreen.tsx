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
  canSubmit: boolean;
  isSubmitting: boolean;
  submitError: string;
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
  canSubmit,
  isSubmitting,
  submitError,
  onTogglePasswordVisibility,
  onSubmit,
  onPressClose,
}: LoginScreenProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
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
        {submitError && (
          <View style={styles.submitError}>
            <FontAwesome5
              name="exclamation-circle"
              style={styles.submitErrorIcon}
              size={20}
            />
            <Text style={styles.submitErrorText}>{submitError}</Text>
          </View>
        )}
        <TouchableOpacity
          disabled={!canSubmit}
          onPress={onSubmit}
          style={[
            styles.submitButton,
            canSubmit
              ? styles.submitButtonEnabled
              : styles.submitButtonDisabled,
          ]}
        >
          <Text
            style={[
              styles.submitButtonText,
              canSubmit
                ? styles.submitButtonTextEnabled
                : styles.submitButtonTextDisabled,
            ]}
          >
            {t("LandingScreen.LOG_IN")}
          </Text>
        </TouchableOpacity>
      </View>
      {isSubmitting && (
        <View style={styles.loadingOverlay}>
          <FontAwesome5
            name="spinner"
            size={40}
            style={styles.loadingSpinner}
          />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
