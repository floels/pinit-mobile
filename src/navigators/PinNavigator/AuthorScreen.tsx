import { NavigationProp, RouteProp } from "@react-navigation/native";

import { PinNavigatorParamList } from "./PinNavigator";

import AccountDetailsView from "@/src/components/AccountDetailsView/AccountDetailsView";
import { HomeNavigatorParamList } from "@/src/navigators/HomeNavigator/HomeNavigator";

type AuthorScreenProps = {
  route: RouteProp<PinNavigatorParamList, "Author">;
  navigation: NavigationProp<PinNavigatorParamList>;
};

const AuthorScreen = ({ route, navigation }: AuthorScreenProps) => {
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

export default AuthorScreen;
