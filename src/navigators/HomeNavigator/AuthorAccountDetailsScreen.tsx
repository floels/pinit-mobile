import { NavigationProp, RouteProp } from "@react-navigation/native";

import AccountDetailsView from "@/src/components/AccountDetailsView/AccountDetailsView";
import { HomeNavigatorParamList } from "@/src/navigators/HomeNavigator/HomeNavigator";

type AccountDetailsScreenProps = {
  route: RouteProp<HomeNavigatorParamList, "AuthorAccountDetails">;
  navigation: NavigationProp<HomeNavigatorParamList>;
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
