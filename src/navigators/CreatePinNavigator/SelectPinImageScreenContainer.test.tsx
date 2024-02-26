import { render, screen, waitFor } from "@testing-library/react-native";
import * as MediaLibrary from "expo-media-library";

import SelectPinImageScreenContainer from "./SelectPinImageScreenContainer";

import messages from "@/translations/en.json";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useFocusEffect: jest.fn(),
}));

jest.mock("expo-media-library", () => ({
  usePermissions: jest.fn(),
  getAssetsAsync: () => ({
    assets: [{ uri: "test-uri-1" }, { uri: "test-uri-2" }],
  }),
}));

const mockedUsePermissions = MediaLibrary.usePermissions as jest.Mock;

const mockNavigation = {
  navigate: jest.fn(),
} as any;

const renderComponent = () => {
  render(
    <SelectPinImageScreenContainer
      handlePressClose={() => {}}
      navigation={mockNavigation}
    />,
  );
};

it("requests camera roll access if permissions hasn't yet been granted", async () => {
  const mockRequestCameraRollAccessPermission = jest
    .fn()
    .mockResolvedValue({ status: "granted" });

  mockedUsePermissions.mockImplementation(() => [
    { accessPrivileges: "none" },
    mockRequestCameraRollAccessPermission,
  ]);

  renderComponent();

  await waitFor(() =>
    expect(mockRequestCameraRollAccessPermission).toHaveBeenCalled(),
  );
});

it("displays error message if camera roll access is refused", async () => {
  mockedUsePermissions.mockImplementation(() => [
    { accessPrivileges: "none" },
    jest.fn().mockResolvedValue({ status: "denied" }),
  ]);

  renderComponent();

  await waitFor(() => {
    screen.getByText(messages.CreatePin.CAMERA_ROLL_ACCESS_REQUIRED);
  });
});

it("renders CameraRollView if camera roll access is granted", async () => {
  mockedUsePermissions.mockImplementation(() => [
    { accessPrivileges: "all" },
    jest.fn().mockResolvedValue({ status: "granted" }),
  ]);

  renderComponent();

  await waitFor(() => {
    const image1 = screen.getByTestId("camera-roll-image-0");

    expect(image1).toHaveProp("source", { uri: "test-uri-1" });

    const image2 = screen.getByTestId("camera-roll-image-1");

    expect(image2).toHaveProp("source", { uri: "test-uri-2" });
  });
});
