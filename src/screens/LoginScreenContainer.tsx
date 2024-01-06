import { NavigationProp } from "@react-navigation/native";
import { UnauthenticatedNavigatorParamList } from "../navigators/UnauthenticatedNavigator";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { isValidEmail, isValidPassword } from "../lib/utils/validation";

type LoginScreenContainerProps = {
  navigation: NavigationProp<UnauthenticatedNavigatorParamList>;
  onSuccessfulLogin: () => void;
};

const computeCanSubmit = (values: { email: string; password: string }) => {
  return isValidEmail(values.email) && isValidPassword(values.password);
};

const LoginScreenContainer = ({
  navigation,
  onSuccessfulLogin,
}: LoginScreenContainerProps) => {
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

  const onSubmit = () => {
    // Fetch logic

    // Upon success:
    onSuccessfulLogin();
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
