import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Image } from "react-native";

import SearchResultsBaseScreenContainer from "./SearchResultsBaseScreenContainer";

import { API_BASE_URL, API_ENDPOINT_SEARCH } from "@/src/lib/constants";
import { getPinWithCamelCaseKeys } from "@/src/lib/utils/serializers";

Image.getSize = jest.fn();

const pinImagesWidth = 100;
const pinImagesAspectRatio = 1.5;

(Image.getSize as jest.Mock).mockImplementation((_, success) => {
  success(pinImagesWidth, pinImagesWidth / pinImagesAspectRatio);
});

const NUMBER_PIN_SUGGESTIONS_PER_PAGE = 12;

const mockPinSuggestionsPage = Array.from(
  { length: NUMBER_PIN_SUGGESTIONS_PER_PAGE },
  (_, index) => ({
    unique_id: index,
    title: `Pin #${index + 1}`,
    image_url: "https://some.url.com",
    author: { username: "johndoe", display_name: "John Doe" },
  }),
);

const mockNavigation = {
  navigate: jest.fn(),
};

const mockHandlePressBack = jest.fn();

const renderComponent = () => {
  render(
    <SearchResultsBaseScreenContainer
      navigation={mockNavigation as any}
      initialSearchTerm="search"
      handlePressBack={mockHandlePressBack}
    />,
  );
};

const endpointWithBaseURL = `${API_BASE_URL}/${API_ENDPOINT_SEARCH}/`;

it(`should set search input value based on initial search term provided,
and search pins accordingly`, async () => {
  renderComponent();

  const searchInput = screen.getByTestId("pins-search-input-text-input");
  expect(searchInput.props.value).toEqual("search");

  expect(fetch).toHaveBeenCalledWith(`${endpointWithBaseURL}?q=search&page=1`);
});

it(`should navigate to proper screen with proper params when user taps on a pin`, async () => {
  fetchMock.mockOnceIf(
    `${endpointWithBaseURL}?q=search&page=1`,
    JSON.stringify({
      results: mockPinSuggestionsPage,
    }),
  );

  renderComponent();

  await waitFor(() => {
    const firstPin = screen.getByText("Pin #1");

    fireEvent.press(firstPin);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("PinDetails", {
      pin: getPinWithCamelCaseKeys(mockPinSuggestionsPage[0]),
      pinImageAspectRatio: pinImagesAspectRatio,
    });
  });
});