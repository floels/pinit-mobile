import { render, screen, waitFor } from "@testing-library/react-native";

import AccountDetailsView from "./AccountDetailsView";

import { API_ENDPOINT_ACCOUNT_DETAILS } from "@/src/lib/constants";
import { pressButton } from "@/src/lib/testing-utils/misc";
import { MOCK_API_RESPONSES_SERIALIZED } from "@/src/lib/testing-utils/mockAPIResponses";
import enTranslations from "@/translations/en.json";

const mockOnPressBack = jest.fn();

const account = MOCK_API_RESPONSES_SERIALIZED[API_ENDPOINT_ACCOUNT_DETAILS];

const renderComponent = (props?: any) => {
  render(
    <AccountDetailsView
      account={account}
      isLoading={false}
      isError={false}
      onPressBack={mockOnPressBack}
      {...props}
    />,
  );
};

it("renders all relevant details", () => {
  renderComponent();

  screen.getByText(account.displayName);
  screen.getByText(account.username);
  screen.getByText(account.description);

  const profilePicture = screen.getByTestId("account-profile-picture");
  expect(profilePicture).toHaveProp("source", {
    uri: account.profilePictureURL,
  });

  const backgroundPicture = screen.getByTestId("account-background-picture");
  expect(backgroundPicture).toHaveProp("source", {
    uri: account.backgroundPictureURL,
  });
});

it("renders spinner when loading", async () => {
  renderComponent({
    isLoading: true,
    accountDetails: undefined,
  });

  await waitFor(() => {
    screen.getByTestId("account-details-loading-spinner");
  });
});

it("renders error state if 'isError' is true and 'accountDetails' is undefined", () => {
  renderComponent({
    isError: true,
    accountDetails: undefined,
  });

  screen.getByText(enTranslations.AccountDetails.ERROR_FETCH_ACCOUNT_DETAILS);
});

it("calls onPressBack when back button is pressed", () => {
  renderComponent();

  pressButton({ testID: "account-details-back-button" });

  expect(mockOnPressBack).toHaveBeenCalledTimes(1);
});
