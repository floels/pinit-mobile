import { NavigationProp, RouteProp } from "@react-navigation/native";

import { SearchResultsNavigatorParamList } from "./SearchResultsNavigator";

import AccountDetails from "@/src/components/AccountDetails/AccountDetails";

type AccountDetailsScreenProps = {
  route: RouteProp<
    SearchResultsNavigatorParamList,
    "SearchResultsNavigatorAuthorAccountDetails"
  >;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
};

const AccountDetailsScreen = ({
  route,
  navigation,
}: AccountDetailsScreenProps) => {
  const { accountDetailsQuery } = route.params;

  const { data: accountDetails, isError, isLoading } = accountDetailsQuery;

  return (
    <AccountDetails
      accountDetails={accountDetails}
      isError={isError}
      isLoading={isLoading}
      onPressBack={navigation.goBack}
    />
  );
};

export default AccountDetailsScreen;
