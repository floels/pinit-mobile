import { RouteProp } from "@react-navigation/native";
import { HomeNavigatorParamList } from "../navigators/HomeNavigator";
import { Text, View } from "react-native";

type PinDetailsScreenProps = {
  route: RouteProp<HomeNavigatorParamList, "PinDetails">;
};

const PinDetailsScreen = ({ route }: PinDetailsScreenProps) => {
  const { pin } = route.params;

  return (
    <View>
      <Text>{pin.title}</Text>
    </View>
  );
};

export default PinDetailsScreen;
