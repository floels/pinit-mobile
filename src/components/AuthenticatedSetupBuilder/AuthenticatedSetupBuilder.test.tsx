import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import { FetchMock } from "jest-fetch-mock";

import AuthenticatedSetupBuilder from "./AuthenticatedSetupBuilder";

import {
  ACCESS_TOKEN_STORAGE_KEY,
  API_BASE_URL,
  API_ENDPOINT_MY_ACCOUNT_DETAILS,
  API_ENDPOINT_REFRESH_TOKEN,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/src/lib/constants";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

const mockSecureStore: { [key: string]: string } = {
  [REFRESH_TOKEN_STORAGE_KEY]: "refresh_token",
  [ACCESS_TOKEN_STORAGE_KEY]: "old_access_token",
};

(SecureStore.setItemAsync as jest.Mock).mockImplementation(
  (key: string, value: string) => {
    mockSecureStore[key] = value;
  },
);

(SecureStore.getItemAsync as jest.Mock).mockImplementation((key: string) =>
  Promise.resolve(mockSecureStore[key]),
);

const renderComponent = () => {
  render(<AuthenticatedSetupBuilder />);
};

const refreshEndpoint = `${API_BASE_URL}/${API_ENDPOINT_REFRESH_TOKEN}/`;
const accountDetailsEndpoint = `${API_BASE_URL}/${API_ENDPOINT_MY_ACCOUNT_DETAILS}/`;

it("should call '/accounts/me/' endpoint with the refreshed access token", async () => {
  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(null),
  ); // to ensure we will refresh the acess token

  const refreshedTokenExpirationDate = "2024-02-09T07:09:45+00:00";

  fetchMock.mockOnceIf(
    refreshEndpoint,
    JSON.stringify({
      access_token: "new_access_token",
      access_token_expiration_utc: refreshedTokenExpirationDate,
    }),
  );

  renderComponent();

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      accountDetailsEndpoint,
      expect.anything(),
    );

    const accountDetailsFetchCall = (fetch as FetchMock).mock.calls[1];

    const accountDetailsFetchCallSecondArgument = accountDetailsFetchCall[1];

    expect(accountDetailsFetchCallSecondArgument).toEqual({
      headers: {
        Authorization: "Bearer new_access_token",
      },
    });
  });
});
