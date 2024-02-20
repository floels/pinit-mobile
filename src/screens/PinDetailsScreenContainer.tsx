import { NavigationProp, RouteProp } from "@react-navigation/native";

import PinDetailsScreen from "./PinDetailsScreen";
import { useAccountDetailsQuery } from "@/src/hooks/useAccountDetails";
import { HomeNavigatorParamList } from "@/src/navigators/HomeNavigator";

type PinDetailsScreenContainerProps = {
  route: RouteProp<HomeNavigatorParamList, "PinDetails">;
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const PinDetailsScreenContainer = ({
  route,
  navigation,
}: PinDetailsScreenContainerProps) => {
  const { pin, pinImageAspectRatio } = route.params;

  // Pre-fetch pin author information, so the account details
  // screen renders immediately if the user taps the author's name:
  const accountDetailsQueryFull = useAccountDetailsQuery({
    username: pin.authorUsername,
  });

  // We select only the relevant attribute of the query,
  // because some attribute of a 'UseQueryResult' are not
  // serializable, which triggers a warning from React Navigation:
  const accountDetailsQuery = {
    data: accountDetailsQueryFull.data,
    isLoading: accountDetailsQueryFull.isLoading,
    isError: accountDetailsQueryFull.isError,
  };

  const handlePressAuthor = () => {
    navigation.navigate("AuthorAccountDetails", { accountDetailsQuery });
  };

  return (
    <PinDetailsScreen
      pin={pin}
      pinImageAspectRatio={pinImageAspectRatio}
      handlePressBack={navigation.goBack}
      handlePressAuthor={handlePressAuthor}
    />
  );
};

export default PinDetailsScreenContainer;
