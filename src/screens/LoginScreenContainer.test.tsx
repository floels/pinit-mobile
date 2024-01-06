import { render } from "@testing-library/react-native";
import LoginScreenContainer from "./LoginScreenContainer";

const renderComponent = () => {
  const mockNavigation = {
    goBack: jest.fn(),
  } as any;

  const mockOnSuccessfulLogin = jest.fn();

  render(
    <LoginScreenContainer
      navigation={mockNavigation}
      onSuccessfulLogin={mockOnSuccessfulLogin}
    />,
  );
};

it("should render", () => {
  renderComponent();
});
