import { NavigationProp, RouteProp } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./HomeScreen.styles";
import { PinNavigatorParamList } from "./PinNavigator";

import PinDetailsView from "@/src/components/PinDetailsView/PinDetailsView";
import { useAccountDetailsQuery } from "@/src/hooks/useAccountDetails";
import { PinWithAuthorDetails } from "@/src/lib/types";

type HomeScreenProps = {
  pin: PinWithAuthorDetails;
  pinImageAspectRatio: number;
  navigation: NavigationProp<PinNavigatorParamList>;
};

const HomeScreen = ({
  pin,
  pinImageAspectRatio,
  navigation,
}: HomeScreenProps) => {
  // Pre-fetch pin author information, so the account details
  // screen renders immediately if the user taps the author's name:
  const accountDetailsQuery = useAccountDetailsQuery({
    username: pin.authorUsername,
  });

  const handlePressAuthor = () => {
    navigation.navigate("Author", {
      accountDetailsQuery,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <FontAwesome5Icon
          name="chevron-left"
          size={20}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
      <PinDetailsView
        pin={pin}
        pinImageAspectRatio={pinImageAspectRatio}
        handlePressAuthor={handlePressAuthor}
      />
    </View>
  );
};

export default HomeScreen;
