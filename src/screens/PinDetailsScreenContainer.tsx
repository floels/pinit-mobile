import { NavigationProp, RouteProp } from "@react-navigation/native";

import PinDetailsScreen from "./PinDetailsScreen";
import { HomeNavigatorParamList } from "../navigators/HomeNavigator";
import { useAccountDetailsQuery } from "../hooks/useAccountDetails";

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
  const accountDetailsQuery = useAccountDetailsQuery({
    username: pin.authorUsername,
  });

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
