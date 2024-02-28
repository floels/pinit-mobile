import { render, screen } from "@testing-library/react-native";
import React from "react";

import PinThumbnailsGrid from "./PinThumbnailsGrid";

const mockPins = [
  {
    title: "Pin 1",
    imageURL: "https://example.com/pin1.jpg",
    authorUsername: "user1",
    authorDisplayName: "User One",
    authorProfilePictureURL: "https://example.com/user1.jpg",
  },
  {
    title: "Pin 2",
    imageURL: "https://example.com/pin2.jpg",
    authorUsername: "user2",
    authorDisplayName: "User Two",
    authorProfilePictureURL: "https://example.com/user2.jpg",
  },
  {
    title: "Pin 3",
    imageURL: "https://example.com/pin3.jpg",
    authorUsername: "user3",
    authorDisplayName: "User Three",
    authorProfilePictureURL: "https://example.com/user3.jpg",
  },
];

const mockAspectRatios = [1, 1.5, 2];

const mockGetTapHandlerForPin = jest.fn();

it("renders the correct number of pins in each column", () => {
  render(
    <PinThumbnailsGrid
      pins={mockPins}
      pinImageAspectRatios={mockAspectRatios}
      getTapHandlerForPin={mockGetTapHandlerForPin}
    />,
  );

  const firstColumn = screen.getByTestId("thumbnails-column-0");

  expect(firstColumn).toContainElement(screen.getByText("Pin 1"));
  expect(firstColumn).toContainElement(screen.getByText("Pin 3"));

  const secondColumn = screen.getByTestId("thumbnails-column-1");

  expect(secondColumn).toContainElement(screen.getByText("Pin 2"));
});
