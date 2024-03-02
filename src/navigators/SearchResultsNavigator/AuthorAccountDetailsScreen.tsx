import { NavigationProp, RouteProp } from "@react-navigation/native";

import { SearchResultsNavigatorParamList } from "./SearchResultsNavigator";

import AccountDetailsView from "@/src/components/AccountDetailsView/AccountDetailsView";

type AccountDetailsScreenProps = {
  route: RouteProp<SearchResultsNavigatorParamList, "AuthorAccountDetails">;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
};

const AccountDetailsScreen = ({
  route,
  navigation,
}: AccountDetailsScreenProps) => {
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

export default AccountDetailsScreen;
