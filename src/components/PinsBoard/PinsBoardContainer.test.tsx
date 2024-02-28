import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { FetchMock } from "jest-fetch-mock";

import PinsBoardContainer, {
  DEBOUNCE_TIME_REFRESH_MS,
  DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS,
} from "./PinsBoardContainer";

import { AuthenticationContext } from "@/src/contexts/authenticationContext";
import {
  API_BASE_URL,
  API_ENDPOINT_PIN_SUGGESTIONS,
} from "@/src/lib/constants";
import { PinWithAuthorDetails } from "@/src/lib/types";
import enTranslations from "@/translations/en.json";

const MOCKED_PIN_THUMBNAIL_HEIGHT = 500;
const NUMBER_PIN_SUGGESTIONS_PER_PAGE = 12;
const SCROLL_VIEW_HEIGHT =
  MOCKED_PIN_THUMBNAIL_HEIGHT * NUMBER_PIN_SUGGESTIONS_PER_PAGE;

jest.mock("expo-secure-store", () => ({
  getItemAsync: () => "access_token",
})); // needed to be able to fetch with authentication

jest.mock("@/src/components/PinsBoard/PinThumbnail", () => {
  const View = jest.requireActual(
    "react-native/Libraries/Components/View/View",
  );

  return (props: any) => (
    <View
      style={{ height: MOCKED_PIN_THUMBNAIL_HEIGHT }}
      testID={`mocked-pin-thumbnail-${props.pin.id}`}
    />
  );
});

const mockGetSize = jest.fn((_, success, __) => {
  success(100, MOCKED_PIN_THUMBNAIL_HEIGHT);
});

jest.mock("react-native/Libraries/Image/Image", () => ({
  ...jest.requireActual("react-native/Libraries/Image/Image"),
  getSize: mockGetSize,
}));

const mockPinSuggestionsPage = Array.from(
  { length: NUMBER_PIN_SUGGESTIONS_PER_PAGE },
  (_, index) => ({
    unique_id: index,
    title: "Pin title",
    image_url: "https://some.url.com",
    author: { username: "johndoe", display_name: "John Doe" },
  }),
);

const mockRefreshedPinSuggestionsPage = Array.from(
  { length: NUMBER_PIN_SUGGESTIONS_PER_PAGE },
  (_, index) => ({
    unique_id: index + NUMBER_PIN_SUGGESTIONS_PER_PAGE,
    title: "Pin title",
    image_url: "https://some.url.com",
    author: { username: "johndoe", display_name: "John Doe" },
  }),
);

const endpointWithBaseURL = `${API_BASE_URL}/${API_ENDPOINT_PIN_SUGGESTIONS}/`;

const mockDispatch = jest.fn();

const mockGetTapHandlerForPin = () => () => {};

const renderComponent = (props?: any) => {
  const initialState = {
    isCheckingAccessToken: false,
    isAuthenticated: true,
  };

  const pinSuggestionsEndpoint = `${API_BASE_URL}/${API_ENDPOINT_PIN_SUGGESTIONS}/`;

  render(
    <AuthenticationContext.Provider
      value={{ state: initialState, dispatch: mockDispatch }}
    >
      <PinsBoardContainer
        fetchEndpoint={pinSuggestionsEndpoint}
        getTapHandlerForPin={mockGetTapHandlerForPin}
        emptyResultsMessageKey="SearchScreen.NO_RESULTS"
        {...props}
      />
    </AuthenticationContext.Provider>,
  );
};

const pullToRefresh = () => {
  const scrollView = screen.getByTestId("pins-board-scroll-view");

  fireEvent.scroll(scrollView, {
    nativeEvent: {
      contentOffset: {
        y: -200,
      },
      contentSize: {
        height: SCROLL_VIEW_HEIGHT,
      },
    },
  });
};

beforeEach(() => {
  fetchMock.resetMocks();
});

it(`fetches and renders first page of pin suggestions upon initial render,
and fetches second page upon scroll`, async () => {
  jest.useFakeTimers();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  await waitFor(() => {
    const pinThumbnails = screen.queryAllByTestId(/^mocked-pin-thumbnail-/);
    expect(pinThumbnails.length).toEqual(NUMBER_PIN_SUGGESTIONS_PER_PAGE);
  });

  act(() => {
    jest.advanceTimersByTime(
      2 * DEBOUNCE_TIME_SCROLL_DOWN_TO_FETCH_MORE_PINS_MS,
    );
  });

  const scrollView = screen.getByTestId("pins-board-scroll-view");
  fireEvent.scroll(scrollView, {
    nativeEvent: {
      contentOffset: {
        y: 2000,
      },
      contentSize: {
        height: SCROLL_VIEW_HEIGHT,
      },
    },
  });

  await waitFor(() => {
    expect(fetch as FetchMock).toHaveBeenLastCalledWith(
      `${endpointWithBaseURL}?page=2`,
    );
  });

  jest.clearAllTimers();
  jest.useRealTimers();
});

it("fetches first page with authentication if relevant", async () => {
  renderComponent({ shouldAuthenticate: true });

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(`${endpointWithBaseURL}?page=1`, {
      headers: { Authorization: "Bearer access_token" },
    });
  });
});

it("displays relevant message if search results are empty", async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: [],
    }),
  );

  renderComponent();

  await waitFor(() => {
    screen.getByText(enTranslations.SearchScreen.NO_RESULTS);
  });
});

it("displays spinner while fetching initial pins", async () => {
  const eternalPromise = new Promise<Response>(() => {});
  fetchMock.mockImplementationOnce(() => eternalPromise);

  renderComponent();

  screen.getByTestId("pins-board-fetch-more-pins-spinner");
});

it("displays error message upon fetch error when fetching initial pins", async () => {
  fetchMock.mockRejectOnce(new Error());

  renderComponent();

  await waitFor(() => {
    screen.getByText(enTranslations.Common.CONNECTION_ERROR);
  });
});

it("dispatches relevant action upon 401 response when fetching initial pins", async () => {
  fetchMock.mockOnceIf(`${endpointWithBaseURL}?page=1`, JSON.stringify({}), {
    status: 401,
  });

  renderComponent();

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith({ type: "GOT_401_RESPONSE" });
  });
});

it("displays error message upon 400 response when fetching initial pins", async () => {
  fetchMock.mockOnceIf(`${endpointWithBaseURL}?page=1`, JSON.stringify({}), {
    status: 400,
  });

  renderComponent();

  await waitFor(() => {
    screen.getByText(enTranslations.Common.ERROR_FETCH_MORE_PINS);
  });
});

it("displays error message upon error in 'Image.getSize()' when fetching initial pins", async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  mockGetSize.mockImplementationOnce((_, __, error) => {
    error(new Error());
  });

  renderComponent();

  await waitFor(() => {
    screen.getByText(enTranslations.Common.ERROR_FETCH_MORE_PINS);
  });
});

it(`refreshes pins when pulling to refresh, and does not refresh
again if user pulls again within debounce time`, async () => {
  jest.useFakeTimers();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockRefreshedPinSuggestionsPage,
    }),
  );

  pullToRefresh();

  await waitFor(() => {
    screen.getByTestId(
      `mocked-pin-thumbnail-${NUMBER_PIN_SUGGESTIONS_PER_PAGE}`,
    );
  });

  (fetch as FetchMock).mockReset();

  jest.advanceTimersByTime(DEBOUNCE_TIME_REFRESH_MS / 2);

  pullToRefresh();

  jest.clearAllTimers();
  jest.useRealTimers();

  await new Promise((resolve) => setTimeout(resolve, 1)); // Without this wait,
  // the following assertion would be inoperative, meaning it would
  // pass even if there was a bug that led the component to fetch again.

  expect(fetch).not.toHaveBeenCalled();
});

it(`refreshes pins when pulling to refresh, and refreshes
again if user pulls again after debounce time`, async () => {
  jest.useFakeTimers();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockRefreshedPinSuggestionsPage,
    }),
  );

  pullToRefresh();

  await waitFor(() => {
    screen.getByTestId(
      `mocked-pin-thumbnail-${NUMBER_PIN_SUGGESTIONS_PER_PAGE}`,
    );
  });

  (fetch as FetchMock).mockReset();
  expect(fetch).not.toHaveBeenCalled();

  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockRefreshedPinSuggestionsPage,
    }),
  );

  act(() => {
    jest.advanceTimersByTime(DEBOUNCE_TIME_REFRESH_MS * 2);
  });

  pullToRefresh();

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(`${endpointWithBaseURL}?page=1`);
  });

  jest.clearAllTimers();
  jest.useRealTimers();
});

it("displays error message upon fetch error on refresh", async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  await waitFor(() => {
    screen.getByTestId("mocked-pin-thumbnail-0");
  });

  fetchMock.mockRejectOnce(new Error());

  pullToRefresh();

  await waitFor(() => {
    screen.getByText(enTranslations.Common.CONNECTION_ERROR);
  });
});

it("dispatches relevant action upon 401 response on refresh", async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  await waitFor(() => {
    screen.getByTestId("mocked-pin-thumbnail-0");
  });

  fetchMock.mockOnceIf(`${endpointWithBaseURL}?page=1`, JSON.stringify({}), {
    status: 401,
  });

  pullToRefresh();

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith({ type: "GOT_401_RESPONSE" });
  });
});

it("displays error message upon 400 response on refresh", async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  await waitFor(() => {
    screen.getByTestId("mocked-pin-thumbnail-0");
  });

  fetchMock.mockOnceIf(`${endpointWithBaseURL}?page=1`, JSON.stringify({}), {
    status: 400,
  });

  pullToRefresh();

  await waitFor(() => {
    screen.getByText(enTranslations.Common.ERROR_REFRESH_PINS);
  });
});
