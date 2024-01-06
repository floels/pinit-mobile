import { render, screen, userEvent } from "@testing-library/react-native";

import LoginScreenContainer from "./LoginScreenContainer";

const mockNavigation = {
  goBack: jest.fn(),
} as any;

const renderComponent = () => {
  const mockOnSuccessfulLogin = jest.fn();

  render(
    <LoginScreenContainer
      navigation={mockNavigation}
      onSuccessfulLogin={mockOnSuccessfulLogin}
    />,
  );
};

it("should call 'navigation.goBack()' when pressing Close icon", async () => {
  renderComponent();

  const closeIcon = screen.getByTestId("login-screen-close-icon");

  await userEvent.press(closeIcon);

  expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
});
