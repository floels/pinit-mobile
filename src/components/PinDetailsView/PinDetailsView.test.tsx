import { render, screen } from "@testing-library/react-native";

import PinDetailsView from "./PinDetailsView";

import { pressButton } from "@/src/lib/testing-utils/misc";

const mockHandlePressAuthor = jest.fn();

const pin = {
  id: "0000",
  title: "Pin title",
  description: "Pin description",
  imageURL: "https://example.com/pin-image.jpg",
  authorUsername: "johndoe",
  authorDisplayName: "John Doe",
  authorProfilePictureURL: "https://example.com/profile-picture.jpg",
};

const renderComponent = () => {
  render(
    <PinDetailsView
      pin={pin}
      pinImageAspectRatio={1.0}
      handlePressAuthor={mockHandlePressAuthor}
    />,
  );
};

it("renders pin details", () => {
  renderComponent();

  const pinImage = screen.getByTestId("pin-details-pin-image");
  expect(pinImage).toHaveProp("source", { uri: pin.imageURL });

  const authorProfilePicture = screen.getByTestId(
    "pin-details-author-profile-picture",
  );
  expect(authorProfilePicture).toHaveProp("source", {
    uri: pin.authorProfilePictureURL,
  });

  screen.getByText(pin.title);
  //screen.getByText(pin.description); //TODO: uncomment
});

it("calls 'handlePressAuthor' upon press on author details", async () => {
  renderComponent();

  pressButton({ testID: "pin-details-author-data" });

  expect(mockHandlePressAuthor).toHaveBeenCalledTimes(1);
});