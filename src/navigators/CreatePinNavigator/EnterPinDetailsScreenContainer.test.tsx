import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { Image } from "react-native";
import Toast from "react-native-toast-message";

import EnterPinDetailsScreenContainer from "./EnterPinDetailsScreenContainer";

import { API_BASE_URL, API_ENDPOINT_CREATE_PIN } from "@/src/lib/constants";
import { pressButton } from "@/src/lib/utils/testing";
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

Image.getSize = jest.fn();

const mockNavigation = {
  goBack: jest.fn(),
} as any;

const mockHandleCreateSuccess = jest.fn();

const renderComponent = (
  { route }: any = {
    route: {
      params: { selectedImageURI: "ph://AAAA", providedImageAspectRatio: 1.5 },
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

const createdPinData = {
  unique_id: "0000",
  image_url: "https://some.url",
  title: "Pin title",
  description: "Pin description",
};

const typeInTitleInput = async (input: string) => {
  const titleInput = screen.getByTestId("pin-title-input");

  await userEvent.type(titleInput, input);
};

const typeInDescriptionInput = async (input: string) => {
  const descriptionInput = screen.getByTestId("pin-description-input");

  await userEvent.type(descriptionInput, input);
};

beforeEach(() => {
  fetchMock.resetMocks();
});

it("calls 'handleCreateSuccess' with proper arguments upon successful pin creation", async () => {
  renderComponent();

  fetchMock.mockOnceIf(createPinEndpoint, JSON.stringify(createdPinData), {
    status: 201,
  });

  pressButton({ testID: "create-pin-submit-button" });

  await waitFor(() => {
    expect(mockHandleCreateSuccess).toHaveBeenCalledWith({
      createdPin: {
        imageURL: createdPinData.image_url,
        title: createdPinData.title,
        description: createdPinData.description,
      },
      createdPinImageAspectRatio: 1.5,
    });
  });
});

it("displays error connection toast upon fetch error", async () => {
  renderComponent();

  fetchMock.mockReject(new Error());

  pressButton({ testID: "create-pin-submit-button" });

  await waitFor(() => {
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "pinCreationError",
        text1: enTranslations.Common.CONNECTION_ERROR,
      }),
    );
  });
});

it("displays error response toast upon KO response", async () => {
  renderComponent();

  fetchMock.mockOnceIf(createPinEndpoint, JSON.stringify({}), { status: 400 });

  pressButton({ testID: "create-pin-submit-button" });

  await waitFor(() => {
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "pinCreationError",
        text1: enTranslations.CreatePin.CREATION_ERROR_MESSAGE,
      }),
    );
  });
});

it("fetches image size itself if aspect ratio wasn't provided", async () => {
  const fetchedAspectRatio = 1.2;

  (Image.getSize as jest.Mock).mockImplementationOnce((_, success) => {
    success(100, 100 / fetchedAspectRatio);
  });

  renderComponent({
    route: {
      params: { selectedImageURI: "ph://AAAA", providedImageAspectRatio: null },
    },
  });

  fetchMock.mockOnceIf(createPinEndpoint, JSON.stringify(createdPinData), {
    status: 201,
  });

  pressButton({ testID: "create-pin-submit-button" });

  await waitFor(() => {
    expect(mockHandleCreateSuccess).toHaveBeenCalledWith({
      createdPin: expect.anything(), // already tested above
      createdPinImageAspectRatio: fetchedAspectRatio,
    });
  });
});

it("does not fetch image size if aspect ratio was provided", async () => {
  (Image.getSize as jest.Mock).mockReset();

  renderComponent();

  expect(Image.getSize).not.toHaveBeenCalled();
});

it(`calls 'handleCreateSuccess' with fallback arguments 
upon malformed OK response`, async () => {
  renderComponent();

  await typeInTitleInput("My title");
  await typeInDescriptionInput("My description");

  fetchMock.mockOnceIf(createPinEndpoint, "");

  pressButton({ testID: "create-pin-submit-button" });

  await waitFor(() => {
    expect(mockHandleCreateSuccess).toHaveBeenCalledWith({
      createdPin: {
        imageURL: "",
        title: "My title",
        description: "My description",
      },
      createdPinImageAspectRatio: 1.5,
    });
  });
});
