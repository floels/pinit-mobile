import { NavigationProp, RouteProp } from "@react-navigation/native";

import { HomeNavigatorParamList } from "../navigators/HomeNavigator";
import { Text, View } from "react-native";

type AccountDetailsScreenProps = {
  route: RouteProp<HomeNavigatorParamList, "AuthorAccountDetails">;
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const AccountDetailsScreen = ({
  route,
  navigation,
}: AccountDetailsScreenProps) => {
  const { accountDetailsQuery } = route.params;

  const { data } = accountDetailsQuery;

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default AccountDetailsScreen;
