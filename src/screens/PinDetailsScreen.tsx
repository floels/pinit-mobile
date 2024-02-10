import { RouteProp } from "@react-navigation/native";
import { Text, View, Image, Dimensions } from "react-native";

import { HomeNavigatorParamList } from "../navigators/HomeNavigator";

type PinDetailsScreenProps = {
  route: RouteProp<HomeNavigatorParamList, "PinDetails">;
};

const PinDetailsScreen = ({ route }: PinDetailsScreenProps) => {
  const { pin, pinImageAspectRatio } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const pinImageHeight = screenWidth / pinImageAspectRatio;

  return (
    <View>
      <Image
        source={{ uri: pin.imageURL }}
        style={{ width: screenWidth, height: pinImageHeight }}
      />
      <Text>{pin.title}</Text>
    </View>
  );
};

export default PinDetailsScreen;
