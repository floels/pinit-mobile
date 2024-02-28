import { NavigationProp } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { CreatedPinDetailsNavigatorParamList } from "./CreatedPinDetailsNavigator";
import styles from "./PinDetailsScreen.styles";

import PinDetails from "@/src/components/PinDetails/PinDetails";
import { useAccountDetailsQuery } from "@/src/hooks/useAccountDetails";
import { PinWithAuthorDetails } from "@/src/lib/types";

type PinDetailsScreenProps = {
  createdPin: PinWithAuthorDetails;
  createdPinImageAspectRatio: number;
  navigation: NavigationProp<CreatedPinDetailsNavigatorParamList>;
  handlePressClose: () => void;
};

const PinDetailsScreen = ({
  createdPin,
  createdPinImageAspectRatio,
  navigation,
  handlePressClose,
}: PinDetailsScreenProps) => {
  // Pre-fetch pin author information, so the account details
  // screen renders immediately if the user taps the author's name:
  const accountDetailsQuery = useAccountDetailsQuery({
    username: createdPin.authorUsername,
  });

  const handlePressAuthor = () => {
    navigation.navigate("AuthorAccountDetails", {
      accountDetailsQuery,
    });
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
        handlePressAuthor={handlePressAuthor}
      />
    </View>
  );
};

export default PinDetailsScreen;
