import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, screen, userEvent } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";

import LoginScreenContainer from "./LoginScreenContainer";
import {
  ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  API_BASE_URL,
  API_ENDPOINT_OBTAIN_TOKEN,
  ERROR_CODE_INVALID_EMAIL,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../lib/constants";

import enTranslations from "@/translations/en.json";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
}));

const mockNavigation = {
  goBack: jest.fn(),
} as any;

const mockOnSuccessfulLogin = jest.fn();

const endpoint = `${API_BASE_URL}/${API_ENDPOINT_OBTAIN_TOKEN}/`;

const renderComponent = () => {
  render(
    <LoginScreenContainer
      navigation={mockNavigation}
      onSuccessfulLogin={mockOnSuccessfulLogin}
    />,
  );
};

const fillInputsWithValidCredentials = async () => {
  const emailInput = screen.getByPlaceholderText(
    enTranslations.LandingScreen.PLACEHOLDER_EMAIL,
  );
  await userEvent.type(emailInput, "john.doe@example.com");

  const passwordInput = screen.getByPlaceholderText(
    enTranslations.LandingScreen.PLACEHOLDER_PASSWORD,
  );
  await userEvent.type(passwordInput, "Pa$$w0rd");
};

const pressSubmit = async () => {
  const submitButton = screen.getByTestId("login-screen-submit-button");

  await userEvent.press(submitButton);
};

it("should call 'navigation.goBack()' when pressing Close icon", async () => {
  jest.useFakeTimers(); // otherwise we get a warning on 'userEvent.press()'

  renderComponent();

  const closeIcon = screen.getByTestId("login-screen-close-icon");

  await userEvent.press(closeIcon);

  expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});

it("should toggle password visibility upon press of corresponding icon", async () => {
  jest.useFakeTimers(); // otherwise we get a warning on 'userEvent.press()'

  renderComponent();

  const passwordInput = screen.getByPlaceholderText(
    enTranslations.LandingScreen.PLACEHOLDER_PASSWORD,
  );

  expect(passwordInput.props.secureTextEntry).toBe(true);

  const togglePasswordVisibilityIcon = screen.getByTestId(
    "login-screen-toggle-password-visibility-icon",
  );

  await userEvent.press(togglePasswordVisibilityIcon);
  expect(passwordInput.props.secureTextEntry).toBe(false);

  await userEvent.press(togglePasswordVisibilityIcon);
  expect(passwordInput.props.secureTextEntry).toBe(true);

  jest.useRealTimers();
});

it("should not enable submit button before inputs are valid", async () => {
  renderComponent();

  const submitButton = screen.getByTestId("login-screen-submit-button");

  expect(submitButton).toBeDisabled();

  const emailInput = screen.getByPlaceholderText(
    enTranslations.LandingScreen.PLACEHOLDER_EMAIL,
  );
  await userEvent.type(emailInput, "john.doe@example.com");

  expect(submitButton).toBeDisabled();

  const passwordInput = screen.getByPlaceholderText(
    enTranslations.LandingScreen.PLACEHOLDER_PASSWORD,
  );
  await userEvent.type(passwordInput, "$h0rt");

  expect(submitButton).toBeDisabled();

  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, "L0ng€nough");

  expect(submitButton).toBeEnabled();
});

it("should persist tokens data and call 'onSuccessfulLogin()' upon successful login", async () => {
  jest.useFakeTimers(); // otherwise we get a warning on 'userEvent.press()'

  renderComponent();

  await fillInputsWithValidCredentials();

  const accessTokenExpirationDate = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000,
  ).toISOString();

  fetchMock.mockOnceIf(
    endpoint,
    JSON.stringify({
      access_token: "access_token",
      refresh_token: "refresh_token",
      access_token_expiration_utc: accessTokenExpirationDate,
    }),
  );

  await pressSubmit();

  expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
    ACCESS_TOKEN_STORAGE_KEY,
    "access_token",
  );
  expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
    REFRESH_TOKEN_STORAGE_KEY,
    "refresh_token",
  );
  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    ACCESS_TOKEN_EXPIRATION_DATE_STORAGE_KEY,
    accessTokenExpirationDate,
  );

  expect(mockOnSuccessfulLogin).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});

it("should display right error message upon fetch fail", async () => {
  jest.useFakeTimers(); // otherwise we get a warning on 'userEvent.press()'

  renderComponent();

  await fillInputsWithValidCredentials();

  fetchMock.mockRejectOnce(new Error("Network failure"));

  await pressSubmit();

  screen.getByText(enTranslations.Common.CONNECTION_ERROR);

  jest.useRealTimers();
});

it("should display right error message upon KO response", async () => {
  jest.useFakeTimers(); // otherwise we get a warning on 'userEvent.press()'

  renderComponent();

  await fillInputsWithValidCredentials();

  fetchMock.doMockOnceIf(
    endpoint,
    JSON.stringify({ errors: [{ code: ERROR_CODE_INVALID_EMAIL }] }),
    {
      status: 401,
    },
  );
  await pressSubmit();
  screen.getByText(enTranslations.LandingScreen.INVALID_EMAIL_LOGIN);

  fetchMock.doMockOnceIf(endpoint, JSON.stringify({}), {
    status: 401,
  });
  await pressSubmit();
  screen.getByText(enTranslations.LandingScreen.INVALID_PASSWORD_LOGIN);

  fetchMock.doMockOnceIf(endpoint, JSON.stringify({}), {
    status: 400,
  });
  await pressSubmit();
  screen.getByText(enTranslations.Common.UNFORESEEN_ERROR);

  jest.useRealTimers();
});
