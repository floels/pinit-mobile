import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";

import AuthenticatedMainNavigator from "./AuthenticatedMainNavigator";

import ToastAnchor from "@/src/components/ToastAnchor/ToastAnchor";
import { AccountContext } from "@/src/contexts/accountContext";
import { pressButton } from "@/src/lib/testing-utils/misc";
import { TypesOfAccount } from "@/src/lib/types";
import enTranslations from "@/translations/en.json";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

const mockAsyncStorageGetItem = AsyncStorage.getItem as jest.Mock;

mockAsyncStorageGetItem.mockImplementation(() => null);

const mockNavigation = {
  navigate: jest.fn(),
};

const account = {
  type: TypesOfAccount.PERSONAL,
  username: "johndoe",
  displayName: "John Doe",
  profilePictureURL: "https://some.domain.com/profile-picture.jpg",
};

const renderComponent = (props?: any) => {
  render(
    <>
      <AccountContext.Provider
        value={{ state: { account }, dispatch: () => {} }}
      >
        <NavigationContainer>
          <AuthenticatedMainNavigator
            navigation={mockNavigation as any}
            route={{} as any}
            {...props}
          />
        </NavigationContainer>
        <ToastAnchor />
      </AccountContext.Provider>
    </>,
  );
};

it("opens the 'Create Select' modal when the 'Create' tab bar icon is tapped", async () => {
  renderComponent();

  await waitFor(() => {
    const createTabBarIcons = screen.queryAllByTestId("tab-bar-icon-create");

    expect(createTabBarIcons.length).toBeGreaterThan(0);

    expect(
      screen.queryByText(
        enTranslations.TabsNavigationBar.CREATE_SELECT_MODAL_TITLE,
      ),
    ).toBeNull();

    fireEvent.press(createTabBarIcons[0]);

    screen.getByText(
      enTranslations.TabsNavigationBar.CREATE_SELECT_MODAL_TITLE,
    );
  });
});

it(`shows pin creation success toast when corresponding route params are provided,
and clicking on 'View' link in toast navigates to relevant screen with relevant parameters`, async () => {
  const routeParams = {
    createdPin: {
      imageURL: "https://example.com/image.jpg",
      title: "Pin title",
      description: "Pin description",
    },
    createdPinImageAspectRatio: 1.5,
  };

  renderComponent({ route: { params: routeParams } });

  pressButton({ testID: "pin-creation-success-toast-view-button" });

  expect(mockNavigation.navigate).toHaveBeenCalledWith("CreatedPinDetails", {
    createdPin: {
      ...routeParams.createdPin,
      authorUsername: account.username,
      authorDisplayName: account.displayName,
      authorProfilePictureURL: account.profilePictureURL,
    },
    createdPinImageAspectRatio: 1.5,
  });
});
