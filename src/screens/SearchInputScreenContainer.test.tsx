import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "@testing-library/react-native";

import SearchInputScreenContainer, {
  AUTOCOMPLETE_DEBOUNCE_TIME_MS,
} from "./SearchInputScreenContainer";
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

const endpoint = `${API_BASE_URL}/${API_ENDPOINT_SEARCH_SUGGESTIONS}/`;

const NUMBER_MOCK_SUGGESTIONS = 12;

const mockSuggestions = Array.from(
  { length: NUMBER_MOCK_SUGGESTIONS },
  (_, index) => `foo suggestion ${index + 1}`,
); // i.e. ["foo suggestion 1", "foo suggestion 2", ..., "foo suggestion 12"]

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
} as any;

const renderComponent = () => {
  render(<SearchInputScreenContainer navigation={mockNavigation} />);
};

const typeInSearchInput = async (input: string) => {
  const searchInput = screen.getByTestId("search-input");

  await userEvent.type(searchInput, input);
};

beforeEach(() => {
  fetchMock.resetMocks();
});

it("should navigate to base screen when pressing 'Cancel'", async () => {
  jest.useFakeTimers();

  renderComponent();

  const cancelButton = screen.getByText(
    enTranslations.SearchScreen.CANCEL_SEARCH_INPUT,
  );

  await userEvent.press(cancelButton);

  expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);

  jest.clearAllTimers();
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

  await typeInSearchInput("abc");

  expect(searchInput.props.value).toEqual("abc");

  const clearIcon = screen.getByTestId("search-input-clear-icon");
  await userEvent.press(clearIcon);

  expect(searchInput.props.value).toEqual("");
  expect(screen.queryByTestId("search-input-clear-icon")).toBeNull();

  jest.clearAllTimers();
  jest.useRealTimers();
});

it(`should display search suggestions as user types, with search input as first suggestion,
and clear suggestions when user clears input`, async () => {
  jest.useFakeTimers();

  fetchMock.doMockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  renderComponent();

  await typeInSearchInput("foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toEqual(NUMBER_MOCK_SUGGESTIONS);
    within(searchSuggestions[0]).getByText("foo"); // search term should appear as first suggestion
    within(searchSuggestions[1]).getByText("foo suggestion 1");
  });

  const clearIcon = screen.getByTestId("search-input-clear-icon");
  await userEvent.press(clearIcon);

  await waitFor(() => {
    expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
  });

  jest.clearAllTimers();
  jest.useRealTimers();
});

it("should not repeat search input as first suggestion if it is already included in suggestions", async () => {
  fetchMock.doMockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: [
        "foo",
        ...mockSuggestions.slice(0, NUMBER_MOCK_SUGGESTIONS - 1),
      ],
    }),
  );

  renderComponent();

  await typeInSearchInput("foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toEqual(NUMBER_MOCK_SUGGESTIONS);
    within(searchSuggestions[0]).getByText("foo"); // search term should appear as first suggestion
    within(searchSuggestions[1]).getByText("foo suggestion 1");
  });
});

it("should not display any suggestions upon malformed OK response", async () => {
  fetchMock.doMockOnceIf(`${endpoint}?search=foo`, "");

  renderComponent();

  await typeInSearchInput("foo");

  expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
});

it("should not display any suggestions upon KO response", async () => {
  fetchMock.doMockOnceIf(`${endpoint}?search=foo`, JSON.stringify({}), {
    status: 400,
  });

  renderComponent();

  await typeInSearchInput("foo");

  expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
});

it("should not display any suggestions upon fetch error", async () => {
  fetchMock.mockRejectOnce(new Error());

  renderComponent();

  await typeInSearchInput("foo");

  expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
});

it("should fetch only once if user types second character within debounce time", async () => {
  jest.useFakeTimers();

  renderComponent();

  await typeInSearchInput("a");

  jest.advanceTimersByTime(AUTOCOMPLETE_DEBOUNCE_TIME_MS / 2);

  await typeInSearchInput("b");

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(`${endpoint}?search=ab`);
  });

  jest.clearAllTimers();
  jest.useRealTimers();
});

it("should fetch twice if user types second character after debounce time", async () => {
  jest.useFakeTimers();

  renderComponent();

  await typeInSearchInput("a");

  await waitFor(() => {
    expect(fetch).toHaveBeenLastCalledWith(`${endpoint}?search=a`);
  });

  jest.advanceTimersByTime(AUTOCOMPLETE_DEBOUNCE_TIME_MS * 2);

  await typeInSearchInput("b");

  await waitFor(() => {
    expect(fetch).toHaveBeenLastCalledWith(`${endpoint}?search=ab`);
  });

  jest.clearAllTimers();
  jest.useRealTimers();
});

it("should navigate to search results screen upon submitting search input", async () => {
  renderComponent();

  await typeInSearchInput("foo");

  const searchInput = screen.getByTestId("search-input");

  fireEvent(searchInput, "submitEditing");

  expect(mockNavigation.navigate).toHaveBeenLastCalledWith("SearchResults", {
    searchTerm: "foo",
  });
});
