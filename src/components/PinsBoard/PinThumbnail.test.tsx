import { render, screen } from "@testing-library/react-native";

import PinThumbnail from "./PinThumbnail";

const pinWithoutAuthorProfilePicture = {
  imageURL: "https//some.domain/pin-image.jpg",
  title: "Pin title",
  description: "",
  authorUsername: "johndoe",
  authorDisplayName: "John Doe",
};

const pinImageWidth = 100;
const pinImageAspectRatio = 1.5;

const renderComponent = ({ pin }: any) => {
  render(
    <PinThumbnail
      pin={pin}
      width={pinImageWidth}
      pinImageAspectRatio={pinImageAspectRatio}
    />,
  );
};

it("displays all relevant data", () => {
  const pin = {
    ...pinWithoutAuthorProfilePicture,
    authorProfilePictureURL: "https//some.domain/profile-picture.jpg",
  };

  renderComponent({ pin });

  const pinImage = screen.getByTestId("pin-thumbnail-pin-image");
  expect(pinImage).toHaveProp("source", { uri: pin.imageURL });
  expect(pinImage).toHaveProp("width", pinImageWidth);
  expect(pinImage).toHaveProp("height", pinImageWidth / pinImageAspectRatio);

  screen.getByText(pin.title);

  const profilePicture = screen.getByTestId(
    "pin-thumbnail-author-profile-picture",
  );
  expect(profilePicture).toHaveProp("source", {
    uri: pin.authorProfilePictureURL,
  });

  screen.getByText(pin.authorDisplayName);
});

it("displays author's name but not their profile picture if its URL was not provided", () => {
  const pin = {
    ...pinWithoutAuthorProfilePicture,
    authorProfilePictureURL: "",
  };

  renderComponent({ pin });

  screen.getByText(pin.authorDisplayName);
  expect(
    screen.queryByTestId("pin-thumbnail-author-profile-picture"),
  ).toBeNull();
});
