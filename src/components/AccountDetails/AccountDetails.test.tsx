import { render, screen, userEvent } from "@testing-library/react-native";

import AccountDetails from "./AccountDetails";

import enTranslations from "@/translations/en.json";

const mockOnPressBack = jest.fn();

const accountDetailsWithoutBackgroundPicture = {
  type: "Personal",
  displayName: "John Doe",
  username: "john_doe",
  profilePictureURL: "http://example.com/profile.jpg",
  backgroundPictureURL: null,
};

const accountDetailsWithBackgroundPicture = {
  ...accountDetailsWithoutBackgroundPicture,
  backgroundPictureURL: "http://example.com/background.jpg",
};

const renderComponent = (props?: any) => {
  render(
    <AccountDetails
      accountDetails={accountDetailsWithoutBackgroundPicture}
      isLoading={false}
      isError={false}
      onPressBack={mockOnPressBack}
      {...props}
    />,
  );
};

const pressBackButton = async () => {
  jest.useFakeTimers();

  const backButton = screen.getByTestId("account-details-back-button");

  await userEvent.press(backButton);

  jest.useRealTimers();
};

it(`renders account details correctly, and does not render 
background picture if none was provided`, () => {
  renderComponent();

  screen.getByText(accountDetailsWithoutBackgroundPicture.displayName);
  screen.getByText(accountDetailsWithoutBackgroundPicture.username);

  const profilePicture = screen.getByTestId("account-profile-picture");
  expect(profilePicture).toHaveProp("source", {
    uri: accountDetailsWithoutBackgroundPicture.profilePictureURL,
  });

  expect(screen.queryByTestId("account-background-picture")).toBeNull();
});

it("renders background picture if one was provided", () => {
  renderComponent({ accountDetails: accountDetailsWithBackgroundPicture });

  const backgroundPicture = screen.getByTestId("account-background-picture");
  expect(backgroundPicture).toHaveProp("source", {
    uri: accountDetailsWithBackgroundPicture.backgroundPictureURL,
  });
});

it("renders spinner when loading", () => {
  renderComponent({
    isLoading: true,
    accountDetails: undefined,
  });

  screen.getByTestId("account-details-loading-spinner");
});

it("renders error state if 'isError' is true and 'accountDetails' is undefined", () => {
  renderComponent({
    isError: true,
    accountDetails: undefined,
  });

  screen.getByText(enTranslations.AccountDetails.ERROR_FETCH_ACCOUNT_DETAILS);
});

it("calls onPressBack when back button is pressed", async () => {
  renderComponent();

  await pressBackButton();

  expect(mockOnPressBack).toHaveBeenCalledTimes(1);
});
