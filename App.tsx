import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

import "./src/lib/i18n";
import { ACCESS_TOKEN_STORAGE_KEY } from "./src/lib/constants";
import AuthenticatedNavigator from "./src/navigators/AuthenticatedNavigator";
import UnauthenticatedNavigator from "./src/navigators/UnauthenticatedNavigator";

const App = () => {
  const [hasCheckedAccessToken, setHasCheckedAccessToken] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAccessToken = async () => {
    let accessToken;

    try {
      accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn("Couldn't read access token from storage: ", error);
    }

    setIsAuthenticated(!!accessToken);
    setHasCheckedAccessToken(true);
  };

  const handleSuccessfulLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSuccessfulLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  if (!hasCheckedAccessToken) {
    return null; // TODO: consider adding splash screen while checking access token
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator onSuccessfulLogout={handleSuccessfulLogout} />
      ) : (
        <UnauthenticatedNavigator onSuccessfulLogin={handleSuccessfulLogin} />
      )}
    </NavigationContainer>
  );
};

export default App;
