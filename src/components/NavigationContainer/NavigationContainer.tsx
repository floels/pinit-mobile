import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";

import { AuthenticationContext } from "@/src/contexts/authenticationContext";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/src/lib/constants";
import AuthenticatedNavigator from "@/src/navigators/AuthenticatedNavigator";
import UnauthenticatedNavigator from "@/src/navigators/UnauthenticatedNavigator";

const NavigatorSwitch = () => {
  const { state, dispatch } = useContext(AuthenticationContext);

  const { isCheckingAccessToken, isAuthenticated } = state;

  const checkAccessToken = async () => {
    let accessToken;

    try {
      accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn("Couldn't read access token from storage: ", error);
      dispatch({ type: "CHECKED_NO_ACCESS_TOKEN" });
      return;
    }

    if (!accessToken) {
      dispatch({ type: "CHECKED_NO_ACCESS_TOKEN" });
      return;
    }

    dispatch({ type: "FOUND_ACCESS_TOKEN" });
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  if (isCheckingAccessToken) {
    return null; // TODO: add splash screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <UnauthenticatedNavigator />
      )}
    </NavigationContainer>
  );
};

export default NavigatorSwitch;
