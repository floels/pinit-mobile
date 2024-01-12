import { render, screen, userEvent } from "@testing-library/react-native";

import SearchInputScreenContainer from "./SearchInputScreenContainer";

import enTranslations from "@/translations/en.json";

jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useFocusEffect: jest.fn(),
  };
});

const mockNavigation = {
  goBack: jest.fn(),
} as any;

const renderComponent = () => {
  render(<SearchInputScreenContainer navigation={mockNavigation} />);
};

it("should navigate to base screen when pressing 'Cancel'", async () => {
  jest.useFakeTimers();

  renderComponent();

  const cancelButton = screen.getByText(
    enTranslations.SearchScreen.CANCEL_SEARCH_INPUT,
  );

  await userEvent.press(cancelButton);

  expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});

it(`should render with empty value in search input and no clear icon initially,
update value and display clear icon when user types, and clear value and hide
clear icon when user presses clear icon`, async () => {
  jest.useFakeTimers();

  renderComponent();

  const searchInput = screen.getByTestId("search-input");

  expect(searchInput.props.value).toEqual("");
  expect(screen.queryByTestId("search-input-clear-icon")).toBeNull();

  await userEvent.type(searchInput, "abc");

  expect(searchInput.props.value).toEqual("abc");

  const clearIcon = screen.getByTestId("search-input-clear-icon");
  await userEvent.press(clearIcon);

  expect(searchInput.props.value).toEqual("");
  expect(screen.queryByTestId("search-input-clear-icon")).toBeNull();

  jest.useRealTimers();
});
