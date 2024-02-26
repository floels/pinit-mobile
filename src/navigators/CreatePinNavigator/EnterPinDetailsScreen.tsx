import { NavigationProp, RouteProp } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { CreatePinNavigatorParamList } from "./CreatePinNavigator";

type EnterPinDetailsScreenProps = {
  navigation: NavigationProp<CreatePinNavigatorParamList>;
  route: RouteProp<CreatePinNavigatorParamList, "EnterPinDetails">;
};

const EnterPinDetailsScreen = ({
  navigation,
  route,
}: EnterPinDetailsScreenProps) => {
  return (
    <FontAwesome5Icon
      name="chevron-left"
      size={24}
      onPress={navigation.goBack}
      style={{ marginTop: 40 }}
    />
  );
};

export default EnterPinDetailsScreen;
