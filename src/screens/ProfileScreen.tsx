import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "./ProfileScreen.styles";
import { AuthenticationContext } from "../contexts/authenticationContext";
import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../lib/constants";

const clearTokensData = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_STORAGE_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing token data:", error);
  }
};

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { dispatch } = useContext(AuthenticationContext);

  const handleLogOut = async () => {
    try {
      await clearTokensData();
    } catch (error) {
      console.warn("Couldn't clear stored tokens data: ", error);
      return;
    }

    dispatch({ type: "LOGGED_OUT" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
        <Text style={styles.logOutButtonText}>
          {t("ProfileScreen.LOG_OUT")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
