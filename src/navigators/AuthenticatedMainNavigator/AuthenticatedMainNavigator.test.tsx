import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";

import AuthenticatedMainNavigator from "./AuthenticatedMainNavigator";

import ToastAnchor from "@/src/components/ToastAnchor/ToastAnchor";
import { AccountContext } from "@/src/contexts/accountContext";
import { API_ENDPOINT_MY_ACCOUNT_DETAILS } from "@/src/lib/constants";
import { pressButton } from "@/src/lib/testing-utils/misc";
import { MOCK_API_RESPONSES_SERIALIZED } from "@/src/lib/testing-utils/mockAPIResponses";

jest.mock("@/src/navigators/HomeNavigator/HomeNavigator.tsx", () => {
  return () => null;
});

const mockNavigation = {
  navigate: jest.fn(),
};

const account = MOCK_API_RESPONSES_SERIALIZED[API_ENDPOINT_MY_ACCOUNT_DETAILS];

const renderComponent = (props?: any) => {
  render(
    <>
      <AccountContext.Provider value={{ account, setAccount: () => {} }}>
        <NavigationContainer>
          <AuthenticatedMainNavigator
            navigation={mockNavigation as any}
            route={{} as any}
            {...props}
          />
        </NavigationContainer>
        <ToastAnchor />
      </AccountContext.Provider>
    </>,
  );
};

it(`shows pin creation success toast when corresponding route params are provided,
and clicking on 'View' link in toast navigates to relevant screen with relevant parameters`, async () => {
  const routeParams = {
    createdPin: {
      imageURL: "https://example.com/image.jpg",
      title: "Pin title",
      description: "Pin description",
    },
    createdPinImageAspectRatio: 1.5,
  };

  renderComponent({ route: { params: routeParams } });

  pressButton({ testID: "pin-creation-success-toast-view-button" });

  expect(mockNavigation.navigate).toHaveBeenCalledWith("CreatedPinDetails", {
    createdPin: {
      ...routeParams.createdPin,
      authorUsername: account.username,
      authorDisplayName: account.displayName,
      authorProfilePictureURL: account.profilePictureURL,
    },
    createdPinImageAspectRatio: 1.5,
  });
});
