import { NavigationProp, RouteProp } from "@react-navigation/native";
import { View, Text } from "react-native";
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
  const { selectedImageURI } = route.params;

  return (
    <View>
      <FontAwesome5Icon
        name="chevron-left"
        size={24}
        onPress={navigation.goBack}
        style={{ marginTop: 40 }}
      />
      <Text>{selectedImageURI}</Text>
    </View>
  );
};

export default EnterPinDetailsScreen;
