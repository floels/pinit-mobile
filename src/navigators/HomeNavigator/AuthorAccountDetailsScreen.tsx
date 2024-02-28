import { NavigationProp, RouteProp } from "@react-navigation/native";

import AccountDetails from "@/src/components/AccountDetails/AccountDetails";
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
    <AccountDetails
      accountDetails={accountDetails}
      isError={isError}
      isLoading={isLoading}
      onPressBack={navigation.goBack}
    />
  );
};

export default AccountDetailsScreen;
