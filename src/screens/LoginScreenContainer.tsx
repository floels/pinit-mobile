import { NavigationProp } from "@react-navigation/native";
import { UnauthenticatedNavigatorParamList } from "../navigators/UnauthenticatedNavigator";
import { useState } from "react";
import SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";
import { isValidEmail, isValidPassword } from "../lib/utils/validation";
import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  API_BASE_URL,
  API_ENDPOINT_OBTAIN_TOKEN,
  ERROR_CODE_INVALID_EMAIL,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../lib/constants";
import {
  NetworkError,
  Response401Error,
  ResponseKOError,
} from "../lib/customErrors";
import { useTranslation } from "react-i18next";

type LoginScreenContainerProps = {
  navigation: NavigationProp<UnauthenticatedNavigatorParamList>;
  onSuccessfulLogin: () => void;
};

type Credentials = {
  email: string;
  password: string;
};

const computeCanSubmit = (values: Credentials) => {
  return isValidEmail(values.email) && isValidPassword(values.password);
};

const fetchTokens = async ({ email, password }: Credentials) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/${API_ENDPOINT_OBTAIN_TOKEN}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    throw new NetworkError();
  }

  if (response.status === 401) {
    const responseData = await response.json();

    const errorMessage = responseData.errors?.[0]?.code;

    throw new Response401Error(errorMessage);
  }

  if (!response.ok) {
    throw new ResponseKOError();
  }

  const responseData = await response.json();

  return responseData;
};

const persistTokensData = async ({
  accessToken,
  refreshToken,
  accessTokenExpirationDate,
}: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationDate: string;
}) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  await AsyncStorage.setItem(
    ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
    accessTokenExpirationDate
  );
};

const LoginScreenContainer = ({
  navigation,
  onSuccessfulLogin,
}: LoginScreenContainerProps) => {
  const { t } = useTranslation();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputChangeHandler =
    ({ input }: { input: "email" | "password" }) =>
    (newValue: string) => {
      const newCredentials = { ...credentials, [input]: newValue };
      setCredentials(newCredentials);

      const newCanSubmit = computeCanSubmit(newCredentials);
      setCanSubmit(newCanSubmit);
    };

  const handleSubmitError = (error: unknown) => {
    if (error instanceof NetworkError) {
      setSubmitError(t("Common.CONNECTION_ERROR"));
      return;
    }

    if (error instanceof Response401Error) {
      if (error.message === ERROR_CODE_INVALID_EMAIL) {
        setSubmitError(t("LandingScreen.INVALID_EMAIL_LOGIN"));
        return;
      }

      setSubmitError(t("LandingScreen.INVALID_PASSWORD_LOGIN"));
      return;
    }

    setSubmitError(t("Common.UNFORESEEN_ERROR"));
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expiration_utc: accessTokenExpirationDate,
      } = await fetchTokens(credentials);

      await persistTokensData({
        accessToken,
        refreshToken,
        accessTokenExpirationDate,
      });

      onSuccessfulLogin();
    } catch (error) {
      handleSubmitError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginScreen
      email={credentials.email}
      onChangeEmail={getInputChangeHandler({ input: "email" })}
      password={credentials.password}
      onChangePassword={getInputChangeHandler({ input: "password" })}
      isPasswordVisible={isPasswordVisible}
      canSubmit={canSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
      onTogglePasswordVisibility={handleTogglePasswordVisibility}
      onSubmit={onSubmit}
      onPressClose={navigation.goBack}
    />
  );
};

export default LoginScreenContainer;
