import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { FetchMock } from "jest-fetch-mock";

import PinsBoardContainer from "./PinsBoardContainer";

import {
  API_BASE_URL,
  API_ENDPOINT_PIN_SUGGESTIONS,
} from "@/src/lib/constants";
import enTranslations from "@/translations/en.json";

jest.mock("expo-secure-store", () => ({
  getItemAsync: () => "access_token",
}));

jest.mock("@/src/components/PinsBoard/PinThumbnail", () => {
  const View = jest.requireActual(
    "react-native/Libraries/Components/View/View",
  );

  const MockedPinThumbnail = () => (
    <View style={{ height: 500 }} testID="mocked-pin-thumbnail" />
  );

  return MockedPinThumbnail;
});

const NUMBER_PIN_SUGGESTIONS_PER_PAGE = 12;
const SCROLL_VIEW_HEIGHT = 500 * NUMBER_PIN_SUGGESTIONS_PER_PAGE;

const mockPinSuggestionsPage = Array.from(
  { length: NUMBER_PIN_SUGGESTIONS_PER_PAGE },
  (_, index) => ({
    id: `01234567890123${index}`,
    title: "Pin title",
    image_url: "https://some.url.com",
    author: { username: "johndoe", display_name: "John Doe" },
  }),
);

const endpoint = `${API_BASE_URL}/${API_ENDPOINT_PIN_SUGGESTIONS}/`;

it(`should fetch and render first page of pin suggestions upon initial render,
and fetch second page upon scroll`, async () => {
  fetchMock.mockOnceIf(
    `${endpoint}?page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  render(<PinsBoardContainer />);

  await waitFor(() => {
    const pinThumbnails = screen.queryAllByTestId("mocked-pin-thumbnail");
    expect(pinThumbnails.length).toEqual(NUMBER_PIN_SUGGESTIONS_PER_PAGE);
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
      `${endpoint}?page=2`,
      expect.anything(),
    );
  });
});

it("should display spinner while fetching", async () => {
  const eternalPromise = new Promise<Response>(() => {});
  fetchMock.mockImplementationOnce(() => eternalPromise);

  render(<PinsBoardContainer />);

  screen.getByTestId("pins-board-spinner");
});

it("should display error message upon fetch error", async () => {
  fetchMock.mockRejectOnce(new Error("Network failure"));

  render(<PinsBoardContainer />);

  await waitFor(() => {
    screen.getByText(enTranslations.Common.CONNECTION_ERROR);
  });
});

it("should display error message upon KO response", async () => {
  fetchMock.doMockOnceIf(`${endpoint}?page=1`, JSON.stringify({}), {
    status: 400,
  });

  render(<PinsBoardContainer />);

  await waitFor(() => {
    screen.getByText(enTranslations.HomeScreen.ERROR_FETCH_PIN_SUGGESTIONS);
  });
});
