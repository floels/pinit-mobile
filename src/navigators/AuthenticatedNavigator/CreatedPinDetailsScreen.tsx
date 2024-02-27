import { NavigationProp, RouteProp } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { AuthenticatedNavigatorParamList } from "./AuthenticatedNavigator";
import styles from "./CreatedPinDetailsScreen.styles";

import PinDetails from "@/src/components/PinDetails/PinDetails";

type CreatedPinDetailsScreenProps = {
  route: RouteProp<AuthenticatedNavigatorParamList, "CreatedPinDetails">;
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatedPinDetailsScreen = ({
  route,
  navigation,
}: CreatedPinDetailsScreenProps) => {
  const { createdPin, createdPinImageAspectRatio } = route.params;

  const handlePressClose = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handlePressClose}>
        <FontAwesome5Icon
          name="times"
          size={20}
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
      <PinDetails
        pin={createdPin}
        pinImageAspectRatio={createdPinImageAspectRatio}
        handlePressAuthor={() => {}}
      />
    </View>
  );
};

export default CreatedPinDetailsScreen;
