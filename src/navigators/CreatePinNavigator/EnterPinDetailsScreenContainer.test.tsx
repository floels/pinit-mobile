import { render, screen, userEvent } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

import EnterPinDetailsScreenContainer from "./EnterPinDetailsScreenContainer";

import { API_BASE_URL, API_ENDPOINT_CREATE_PIN } from "@/src/lib/constants";
import enTranslations from "@/translations/en.json";

jest.mock("expo-media-library", () => ({
  getAssetInfoAsync: () => "file:///my/image/path.jpeg",
}));

jest.mock("mime", () => ({
  getType: () => "image/jpeg",
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: () => "access_token",
})); // needed to be able to fetch with authentication

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

const mockedGetSize = jest.fn();

jest.mock("react-native/Libraries/Image/Image", () => ({
  ...jest.requireActual("react-native/Libraries/Image/Image"),
  getSize: mockedGetSize,
}));

const mockNavigation = {
  goBack: jest.fn(),
} as any;

const mockHandleCreateSuccess = jest.fn();

const renderComponent = (
  { route }: any = {
    route: {
      params: { selectedImageURI: "ph://AAAA", providedImageAspectRatio: 1 },
    },
  },
) => {
  render(
    <EnterPinDetailsScreenContainer
      navigation={mockNavigation}
      route={route}
      handleCreateSuccess={mockHandleCreateSuccess}
    />,
  );
};

const createPinEndpoint = `${API_BASE_URL}/${API_ENDPOINT_CREATE_PIN}/`;

const typeInTitleInput = async (input: string) => {
  const titleInput = screen.getByTestId("pin-title-input");

  await userEvent.type(titleInput, input);
};

const typeInDescriptionInput = async (input: string) => {
  const descriptionInput = screen.getByTestId("pin-description-input");

  await userEvent.type(descriptionInput, input);
};

const pressSubmit = async () => {
  jest.useFakeTimers();

  const submitButton = screen.getByTestId("create-pin-submit-button");

  await userEvent.press(submitButton);

  jest.useRealTimers();
};

it("should call 'handleCreateSuccess' upon successful pin creation", async () => {
  renderComponent();

  await typeInTitleInput("My title");
  await typeInDescriptionInput("My description");

  fetchMock.mockOnceIf(
    createPinEndpoint,
    JSON.stringify({
      unique_id: "0000",
      image_url: "https://some.url",
      title: "My title",
      description: "My description",
    }),
    { status: 201 },
  );

  expect(mockHandleCreateSuccess).not.toHaveBeenCalled();

  await pressSubmit();

  expect(mockHandleCreateSuccess).toHaveBeenCalledTimes(1);
});

it("should display error connection toast upon fetch error", async () => {
  renderComponent();

  fetchMock.mockReject(new Error());

  await pressSubmit();

  expect(Toast.show).toHaveBeenLastCalledWith(
    expect.objectContaining({
      type: "error",
      text1: enTranslations.Common.CONNECTION_ERROR_TOAST_TITLE,
    }),
  );
});

it("should display error response toast upon KO response", async () => {
  renderComponent();

  fetchMock.mockOnceIf(createPinEndpoint, JSON.stringify({}), { status: 400 });

  await pressSubmit();

  expect(Toast.show).toHaveBeenLastCalledWith(
    expect.objectContaining({
      type: "error",
      text1: enTranslations.CreatePin.CREATION_ERROR_TOAST_TITLE,
    }),
  );
});

it("should fetch image size if aspect ratio wasn't provided", async () => {
  renderComponent({
    route: {
      params: { selectedImageURI: "ph://AAAA", providedImageAspectRatio: null },
    },
  });

  expect(mockedGetSize).toHaveBeenCalledWith("ph://AAAA", expect.any(Function));
});

it("should not fetch image size if aspect ratio was provided", async () => {
  mockedGetSize.mockReset();

  renderComponent();

  expect(mockedGetSize).not.toHaveBeenCalled();
});
