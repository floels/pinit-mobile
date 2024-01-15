import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "@testing-library/react-native";

import SearchInputScreenContainer from "./SearchInputScreenContainer";
import {
  API_BASE_URL,
  API_ENDPOINT_SEARCH_SUGGESTIONS,
} from "../lib/constants";

import enTranslations from "@/translations/en.json";

jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useFocusEffect: jest.fn(),
  };
});

const endpoint = `${API_BASE_URL}/${API_ENDPOINT_SEARCH_SUGGESTIONS}`;

const NUMBER_MOCK_SUGGESTIONS = 12;

const mockSuggestions = Array.from(
  { length: NUMBER_MOCK_SUGGESTIONS },
  (_, index) => `foo suggestion ${index + 1}`,
); // i.e. ["foo suggestion 1", "foo suggestion 2", ..., "foo suggestion 12"]

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

it("should display search suggestions as user types, with search input as first suggestion", async () => {
  fetchMock.mockOnceIf(
    `${endpoint}/?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  renderComponent();

  const searchInput = screen.getByTestId("search-input");

  await userEvent.type(searchInput, "foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toEqual(NUMBER_MOCK_SUGGESTIONS);
    within(searchSuggestions[0]).getByText("foo"); // search term should appear as first suggestion
    within(searchSuggestions[1]).getByText("foo suggestion 1");
  });
});

it("should not repeat search input as first suggestion if it is already included in suggestions", async () => {
  fetchMock.mockOnceIf(
    `${endpoint}/?search=foo`,
    JSON.stringify({
      results: [
        "foo",
        ...mockSuggestions.slice(0, NUMBER_MOCK_SUGGESTIONS - 1),
      ],
    }),
  );

  renderComponent();

  const searchInput = screen.getByTestId("search-input");

  await userEvent.type(searchInput, "foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toEqual(NUMBER_MOCK_SUGGESTIONS);
    within(searchSuggestions[0]).getByText("foo"); // search term should appear as first suggestion
    within(searchSuggestions[1]).getByText("foo suggestion 1");
  });
});

it("should clear suggestions when user clears input", async () => {
  // TODO;
});

it("should not display any suggestions upon malformed OK response", async () => {
  // TODO;
});

it("should not display any suggestions upon KO response", async () => {
  // TODO;
});

it("should not display any suggestions upon fetch error", async () => {
  // TODO;
});

it("should fetch only once if user types second character within debounce time", async () => {
  // TODO;
});

it("should fetch twice if user types second character after debounce time", async () => {
  // TODO;
});

it("should navigate to search results screen upon submitting search input", async () => {
  // TODO;
});
