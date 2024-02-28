import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";

import AccountDetailsFetcher from "./AccountDetailsFetcher";

import { AccountContext } from "@/src/contexts/accountContext";
import { AuthenticationContext } from "@/src/contexts/authenticationContext";
import {
  API_BASE_URL,
  API_ENDPOINT_MY_ACCOUNT_DETAILS,
  PROFILE_PICTURE_URL_STORAGE_KEY,
} from "@/src/lib/constants";
import { getAccountWithCamelCaseKeys } from "@/src/lib/utils/serializers";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

const mockAuthenticationContextDispatch = jest.fn();
const mockAccountContextDispatch = jest.fn();

const renderComponent = () => {
  const authenticationContextInitialState = {
    isCheckingAccessToken: false,
    isAuthenticated: true,
  };

  const accountContextInitialState = {
    account: null,
  };

  render(
    <AuthenticationContext.Provider
      value={{
        state: authenticationContextInitialState,
        dispatch: mockAuthenticationContextDispatch,
      }}
    >
      <AccountContext.Provider
        value={{
          state: accountContextInitialState,
          dispatch: mockAccountContextDispatch,
        }}
      >
        <AccountDetailsFetcher />
      </AccountContext.Provider>
    </AuthenticationContext.Provider>,
  );
};

const accountDetails = {
  type: "personal",
  username: "johndoe",
  display_name: "John Doe",
  initial: "J",
  profile_picture_url: "https://example.com/profile-picture.jpg",
};

const accountDetailsEndpoint = `${API_BASE_URL}/${API_ENDPOINT_MY_ACCOUNT_DETAILS}/`;

it("dispatches relevant action and persist profile picture URL upon successful fetch", async () => {
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(
    () => "access_token",
  );

  fetchMock.mockOnceIf(accountDetailsEndpoint, JSON.stringify(accountDetails));

  renderComponent();

  await waitFor(() => {
    expect(mockAccountContextDispatch).toHaveBeenCalledWith({
      type: "FETCHED_ACCOUNT_DETAILS",
      accountDetails: getAccountWithCamelCaseKeys(accountDetails),
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      PROFILE_PICTURE_URL_STORAGE_KEY,
      accountDetails.profile_picture_url,
    );
  });
});

it("dispatches relevant action upon 401 response", async () => {
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(
    () => "access_token",
  );

  fetchMock.mockOnceIf(accountDetailsEndpoint, JSON.stringify({}), {
    status: 401,
  });

  renderComponent();

  await waitFor(() => {
    expect(mockAuthenticationContextDispatch).toHaveBeenCalledWith({
      type: "GOT_401_RESPONSE",
    });
  });
});

it("fails silently upon KO response", async () => {
  (SecureStore.getItemAsync as jest.Mock).mockImplementationOnce(
    () => "access_token",
  );

  fetchMock.mockOnceIf(accountDetailsEndpoint, JSON.stringify({}), {
    status: 400,
  });

  renderComponent();
});
