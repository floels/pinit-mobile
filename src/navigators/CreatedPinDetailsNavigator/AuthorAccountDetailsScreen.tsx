import { NavigationProp, RouteProp } from "@react-navigation/native";

import { CreatedPinDetailsNavigatorParamList } from "./CreatedPinDetailsNavigator";

import AccountDetailsView from "@/src/components/AccountDetailsView/AccountDetailsView";

type AuthorAccountDetailsScreenProps = {
  route: RouteProp<CreatedPinDetailsNavigatorParamList, "AuthorAccountDetails">;
  navigation: NavigationProp<CreatedPinDetailsNavigatorParamList>;
};

const AuthorAccountDetailsScreen = ({
  route,
  navigation,
}: AuthorAccountDetailsScreenProps) => {
  const { accountDetailsQuery } = route.params;

  const { data: accountDetails, isError, isLoading } = accountDetailsQuery;

  return (
    <AccountDetailsView
      account={accountDetails}
      isError={isError}
      isLoading={isLoading}
      onPressBack={navigation.goBack}
    />
  );
};

export default AuthorAccountDetailsScreen;
