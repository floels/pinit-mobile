import { NavigationProp, RouteProp } from "@react-navigation/native";

import PinDetailsScreen from "./PinDetailsScreen";
import { HomeNavigatorParamList } from "../navigators/HomeNavigator";

type PinDetailsScreenContainerProps = {
  route: RouteProp<HomeNavigatorParamList, "PinDetails">;
  navigation: NavigationProp<HomeNavigatorParamList>;
};

const PinDetailsScreenContainer = ({
  route,
  navigation,
}: PinDetailsScreenContainerProps) => {
  const { pin, pinImageAspectRatio } = route.params;

  return (
    <PinDetailsScreen
      pin={pin}
      pinImageAspectRatio={pinImageAspectRatio}
      handlePressBack={navigation.goBack}
    />
  );
};

export default PinDetailsScreenContainer;
