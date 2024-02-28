import { render } from "@testing-library/react-native";

import LandingScreen from "./LandingScreen";

import { pressButton } from "@/src/lib/utils/testing";

const mockNavigation = {
  navigate: jest.fn(),
} as any;

const renderComponent = () => {
  render(<LandingScreen navigation={mockNavigation} />);
};

it("navigates to login screen when pressing 'Log in' button", async () => {
  renderComponent();

  pressButton({ testID: "log-in-button" });

  expect(mockNavigation.navigate).toHaveBeenCalledWith("LoginScreen");
});
