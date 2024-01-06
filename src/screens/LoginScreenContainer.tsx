import { NavigationProp } from "@react-navigation/native";
import { UnauthenticatedNavigatorParamList } from "../navigators/UnauthenticatedNavigator";
import { useState } from "react";
import LoginScreen from "./LoginScreen";

type LoginScreenContainerProps = {
  navigation: NavigationProp<UnauthenticatedNavigatorParamList>;
  handleSubmitLogin: () => void;
};

const LoginScreenContainer = ({
  navigation,
  handleSubmitLogin,
}: LoginScreenContainerProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LoginScreen
      email={email}
      onChangeEmail={setEmail}
      password={password}
      onChangePassword={setPassword}
      isPasswordVisible={isPasswordVisible}
      onTogglePasswordVisibility={handleTogglePasswordVisibility}
      onSubmit={handleSubmitLogin}
      onPressClose={navigation.goBack}
    />
  );
};

export default LoginScreenContainer;
