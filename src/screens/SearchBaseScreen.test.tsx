import { fireEvent, render, screen } from "@testing-library/react-native";
import enTranslations from "@/translations/en.json";

import SearchBaseScreen from "./SearchBaseScreen";

const mockNavigation = {
  navigate: jest.fn(),
} as any;

const renderComponent = () => {
  render(<SearchBaseScreen navigation={mockNavigation} />);
};

it("should navigate to search input screen when pressing search input", () => {
  renderComponent();

  const searchInput = screen.getByText(
    enTranslations.SearchScreen.BASE_SCREEN_SEARCH_INPUT_PLACEHOLDER,
  );
  fireEvent.press(searchInput); // for some reason await userEvent.press(...) doesn't work here

  expect(mockNavigation.navigate).toHaveBeenCalledWith("SearchInput");
});
