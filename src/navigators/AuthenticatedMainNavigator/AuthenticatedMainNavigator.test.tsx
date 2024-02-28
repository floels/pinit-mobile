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

import enTranslations from "@/translations/en.json";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

const mockAsyncStorageGetItem = AsyncStorage.getItem as jest.Mock;

mockAsyncStorageGetItem.mockImplementation(() => null);

const mockNavigation = {
  navigate: jest.fn(),
};

const renderComponent = () => {
  render(
    <NavigationContainer>
      <AuthenticatedMainNavigator
        navigation={mockNavigation as any}
        route={{} as any}
      />
    </NavigationContainer>,
  );
};

it('opens the "Create Select" modal when the "Create" tab bar icon is tapped', async () => {
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
