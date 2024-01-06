import * as SecureStore from "expo-secure-store";

import { ACCESS_TOKEN_STORAGE_KEY, API_BASE_URL } from "../constants";
import { MissingAccessTokenError } from "../customErrors";

export const fetchWithAuthentication = async ({
  endpoint,
  fetchOptions,
}: {
  endpoint: string;
  fetchOptions?: RequestInit;
}) => {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY);

  if (!accessToken) {
    throw new MissingAccessTokenError();
  }

  return fetch(`${API_BASE_URL}/${endpoint}`, {
    ...fetchOptions,
    headers: {
      ...fetchOptions?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
