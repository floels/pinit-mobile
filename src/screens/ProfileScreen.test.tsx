import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";

import ProfileScreen from "./ProfileScreen";
import { AuthenticationContext } from "../contexts/authenticationContext";
import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../lib/constants";

jest.mock("@/src/components/LoadingOverlay/LoadingOverlay", () => {
  const View = jest.requireActual(
    "react-native/Libraries/Components/View/View",
  );

  return () => <View testID="mocked-loading-overlay" />;
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  removeItem: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  deleteItemAsync: jest.fn(),
}));

const mockDispatch = jest.fn();

const renderComponent = () => {
  const initialState = {
    isCheckingAccessToken: false,
    isAuthenticated: true,
  };

  render(
    <AuthenticationContext.Provider
      value={{ state: initialState, dispatch: mockDispatch }}
    >
      <ProfileScreen />
    </AuthenticationContext.Provider>,
  );
};

const pressLogOutButton = async () => {
  const logOutButton = screen.getByTestId("log-out-button");

  await userEvent.press(logOutButton);
};

it(`should clear tokens data and dispatch logout action
upon click on 'Log out' button`, async () => {
  jest.useFakeTimers();

  renderComponent();

  (SecureStore.deleteItemAsync as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(),
  );
  (AsyncStorage.removeItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(),
  );

  await pressLogOutButton();

  expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
    ACCESS_TOKEN_STORAGE_KEY,
  );
  expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
    REFRESH_TOKEN_STORAGE_KEY,
  );
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
    ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  );

  expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGGED_OUT" });

  jest.useRealTimers();
});

it(`should display loading overlay while clearing tokens data,
and hide loading overlay when clearing tokens data failed`, async () => {
  jest.useFakeTimers();

  renderComponent();

  let rejectSecureStoreDeleteItemAsync = (reason?: any) => {};

  const secureStoreDeleteItemAsyncPromise = new Promise((resolve, reject) => {
    rejectSecureStoreDeleteItemAsync = reject;
  });

  (SecureStore.deleteItemAsync as jest.Mock).mockImplementation(
    () => secureStoreDeleteItemAsyncPromise,
  );
  (AsyncStorage.removeItem as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(),
  );

  await pressLogOutButton();

  screen.getByTestId("mocked-loading-overlay");

  rejectSecureStoreDeleteItemAsync();

  await waitFor(() => {
    expect(screen.queryByTestId("mocked-loading-overlay")).toBeNull();
  });
});
