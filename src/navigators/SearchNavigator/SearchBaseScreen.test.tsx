import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "@testing-library/react-native";

import SearchBaseScreen from "./SearchBaseScreen";

import { AUTOCOMPLETE_DEBOUNCE_TIME_MS } from "@/src/components/PinsSearchInput/PinsSearchInputContainer";
import {
  API_BASE_URL,
  API_ENDPOINT_SEARCH_SUGGESTIONS,
} from "@/src/lib/constants";
import { pressButton } from "@/src/lib/utils/testing";

const mockNavigation = {
  navigate: jest.fn(),
} as any;

const endpoint = `${API_BASE_URL}/${API_ENDPOINT_SEARCH_SUGGESTIONS}/`;

const NUMBER_MOCK_SUGGESTIONS = 12;

const mockSuggestions = Array.from(
  { length: NUMBER_MOCK_SUGGESTIONS },
  (_, index) => `foo suggestion ${index + 1}`,
); // i.e. ["foo suggestion 1", "foo suggestion 2", ..., "foo suggestion 12"]

const renderComponent = () => {
  render(<SearchBaseScreen navigation={mockNavigation} />);
};

const focusSearchInput = () => {
  const searchInput = screen.getByTestId("search-input");

  fireEvent(searchInput, "focus");
};

const typeInSearchInput = async (input: string) => {
  const searchInput = screen.getByTestId("search-input");

  await userEvent.type(searchInput, input);
};

const submitSearchInput = () => {
  const searchInput = screen.getByTestId("search-input");

  fireEvent(searchInput, "submitEditing");
};

beforeEach(() => {
  fetchMock.resetMocks();
});

it("displays search input with search icon initially", () => {
  renderComponent();

  screen.getByTestId("pins-search-input-search-icon");
});

it("hides search input upon input focus", () => {
  renderComponent();

  focusSearchInput();

  expect(screen.queryByTestId("pins-search-input-search-icon")).toBeNull();
});

it("shows 'Clear' icon only when user starts typing in search input", async () => {
  renderComponent();

  focusSearchInput();

  expect(screen.queryByTestId("pins-search-input-clear-icon")).toBeNull();

  await typeInSearchInput("a");

  screen.getByTestId("pins-search-input-clear-icon");
});

it("clears input and hides clear icon when user presses 'Clear' icon", async () => {
  renderComponent();

  await typeInSearchInput("abc");

  const searchInput = screen.getByTestId("search-input");
  expect(searchInput.props.value).toEqual("abc");

  await pressButton({ testID: "pins-search-input-clear-icon" });

  expect(searchInput.props.value).toEqual("");

  expect(screen.queryByTestId("pins-search-input-clear-icon")).toBeNull();
});

it("clears input and shows search icon again when user presses 'Cancel'", async () => {
  renderComponent();

  await typeInSearchInput("abc");

  await pressButton({ testID: "pins-search-input-cancel-button" });

  const searchInput = screen.getByTestId("search-input");
  expect(searchInput.props.value).toEqual("");

  screen.getByTestId("pins-search-input-search-icon");
});

it(`displays search suggestions as user types, with search input as first suggestion,
and clear suggestions when user clears input`, async () => {
  renderComponent();

  fetchMock.mockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  await typeInSearchInput("foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toEqual(NUMBER_MOCK_SUGGESTIONS);

    within(searchSuggestions[0]).getByText("foo"); // search term should appear as first suggestion
    within(searchSuggestions[1]).getByText("foo suggestion 1");
  });
});

it("does not repeat search input as first suggestion if it is already included in suggestions", async () => {
  fetchMock.mockOnceIf(
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

it("does not display any suggestion upon malformed OK response", async () => {
  fetchMock.mockOnceIf(`${endpoint}?search=foo`, "");

  renderComponent();

  await typeInSearchInput("foo");

  expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
});

it("does not display any suggestion upon KO response", async () => {
  renderComponent();

  fetchMock.mockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  await typeInSearchInput("foo");

  await waitFor(() => {
    expect(
      screen.queryAllByTestId("search-suggestion-item").length,
    ).toBeGreaterThan(0);
  });

  fetchMock.mockOnceIf(`${endpoint}?search=foobar`, JSON.stringify({}), {
    status: 400,
  });

  await typeInSearchInput("bar");

  await waitFor(() => {
    expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
  });
});

it("does not display any suggestions upon fetch error", async () => {
  renderComponent();

  fetchMock.mockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  await typeInSearchInput("foo");

  await waitFor(() => {
    expect(
      screen.queryAllByTestId("search-suggestion-item").length,
    ).toBeGreaterThan(0);
  });

  fetchMock.mockRejectOnce(new Error());

  await typeInSearchInput("bar");

  await waitFor(() => {
    expect(screen.queryByTestId("search-suggestion-item")).toBeNull();
  });
});

it("fetches only once if user types second character within debounce time", async () => {
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

it("fetches twice if user types second character after debounce time", async () => {
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

it("navigates to search results screen upon submitting search input", async () => {
  renderComponent();

  await typeInSearchInput("foo");

  submitSearchInput();

  expect(mockNavigation.navigate).toHaveBeenLastCalledWith("SearchResults", {
    searchTerm: "foo",
  });
});

it("navigates to search results screen upon pressing search suggestion item", async () => {
  jest.useFakeTimers();

  fetchMock.mockOnceIf(
    `${endpoint}?search=foo`,
    JSON.stringify({
      results: mockSuggestions,
    }),
  );

  renderComponent();

  await typeInSearchInput("foo");

  await waitFor(() => {
    const searchSuggestions = screen.queryAllByTestId("search-suggestion-item");

    expect(searchSuggestions.length).toBeGreaterThan(0);
  });

  const firstSuggestionItem = screen.getByText("foo suggestion 1");

  await userEvent.press(firstSuggestionItem);

  expect(mockNavigation.navigate).toHaveBeenLastCalledWith("SearchResults", {
    searchTerm: "foo suggestion 1",
  });

  jest.useRealTimers();
});
