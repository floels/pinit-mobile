import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";

import AccessTokenRefresher, {
  TOKEN_REFRESH_BUFFER_BEFORE_EXPIRATION_MS,
} from "./AccessTokenRefresher";

import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  API_BASE_URL,
  API_ENDPOINT_REFRESH_TOKEN,
} from "@/src/lib/constants";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

const refreshEndpoint = `${API_BASE_URL}/${API_ENDPOINT_REFRESH_TOKEN}`;

const renderComponent = () => {
  render(<AccessTokenRefresher />);
};

beforeEach(() => {
  fetchMock.resetMocks();
});

it("should not refresh the access token if the expiration date is after the cutoff", async () => {
  const nowTime = new Date().getTime();

  const accessTokenExpirationDate = new Date(
    nowTime + 2 * TOKEN_REFRESH_BUFFER_BEFORE_EXPIRATION_MS,
  );

  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(accessTokenExpirationDate.toISOString()),
  );

  renderComponent();

  await new Promise((resolve) => setTimeout(resolve, 1)); // Without this wait,
  // the following assertion would be inoperative, meaning it would
  // pass even if there was a bug that led the component to fetch.

  expect(fetch).not.toHaveBeenCalled();
});

it("should refresh the access token if the expiration date is before the cutoff", async () => {
  const nowTime = new Date().getTime();

  const accessTokenExpirationDate = new Date(
    nowTime + TOKEN_REFRESH_BUFFER_BEFORE_EXPIRATION_MS / 2,
  );

  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(accessTokenExpirationDate.toISOString()),
  );
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve("refresh_token"),
  );

  const refreshedTokenExpirationDate = "2024-02-09T07:09:45+00:00";

  fetchMock.mockOnceIf(
    refreshEndpoint,
    JSON.stringify({
      access_token: "access_token",
      access_token_expiration_utc: refreshedTokenExpirationDate,
    }),
  );

  renderComponent();

  await waitFor(() => {
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      ACCESS_TOKEN_STORAGE_KEY,
      "access_token",
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
      refreshedTokenExpirationDate,
    );
  });
});

it("should refresh the access token if the expiration date is absent", async () => {
  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(null),
  );
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve("refresh_token"),
  );

  renderComponent();

  await waitFor(() => {
    expect(fetch).toHaveBeenCalled();
  });
});

it("should refresh the access token if the expiration date is invalid", async () => {
  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve("20-10-03"),
  );
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve("refresh_token"),
  );

  renderComponent();

  await waitFor(() => {
    expect(fetch).toHaveBeenCalled();
  });
});

it("should not fetch if expiration date is absent and refresh token is absent", async () => {
  (AsyncStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(null),
  );
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(null),
  );

  renderComponent();

  await new Promise((resolve) => setTimeout(resolve, 1)); // Without this wait,
  // the following assertion would be inoperative, meaning it would
  // pass even if there was a bug that led the component to fetch.

  expect(fetch).not.toHaveBeenCalled();
});
