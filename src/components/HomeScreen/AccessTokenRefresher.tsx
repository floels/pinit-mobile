import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  API_BASE_URL,
  API_ENDPOINT_REFRESH_TOKEN,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/src/lib/constants";
import { persistTokensData } from "@/src/lib/utils/authentication";

export const TOKEN_REFRESH_BUFFER_BEFORE_EXPIRATION_MS = 60 * 60 * 1000; // i.e. 1 hour

const AccessTokenRefresher = () => {
  const refreshAccessTokenIfNeeded = async () => {
    const shouldRefreshAccessToken = await checkShouldRefreshAccessToken();

    if (shouldRefreshAccessToken) {
      await refreshAccessToken();
    }
  };

  const checkShouldRefreshAccessToken = async () => {
    const accessTokenExpirationDateString = await AsyncStorage.getItem(
      ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
    );

    if (!accessTokenExpirationDateString) {
      return true;
    }

    const accessTokenExpirationDateTime = new Date(
      accessTokenExpirationDateString,
    ).getTime();

    const isInvalidDate = isNaN(accessTokenExpirationDateTime);

    if (isInvalidDate) {
      return true;
    }

    const nowTime = new Date().getTime();

    return (
      nowTime + TOKEN_REFRESH_BUFFER_BEFORE_EXPIRATION_MS >
      accessTokenExpirationDateTime
    );
  };

  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync(
      REFRESH_TOKEN_STORAGE_KEY,
    );

    if (!refreshToken) {
      // Fail silently:
      return;
    }

    let response;

    try {
      const url = `${API_BASE_URL}/${API_ENDPOINT_REFRESH_TOKEN}`;

      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });
    } catch {
      // Fail silently:
      return;
    }

    if (!response.ok) {
      // Fail silently:
      return;
    }

    let responseData;

    try {
      responseData = await response.json();
    } catch {
      // Fail silently:
      return;
    }

    const {
      access_token: accessToken,
      access_token_expiration_utc: accessTokenExpirationDate,
    } = responseData;

    persistTokensData({ accessToken, accessTokenExpirationDate });
  };

  useEffect(() => {
    refreshAccessTokenIfNeeded();
  }, []);

  return null;
};

export default AccessTokenRefresher;
