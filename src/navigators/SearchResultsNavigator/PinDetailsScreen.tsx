import { NavigationProp, RouteProp } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./PinDetailsScreen.styles";
import { SearchResultsNavigatorParamList } from "./SearchResultsNavigator";

import PinDetailsView from "@/src/components/PinDetailsView/PinDetailsView";
import { useAccountDetailsQuery } from "@/src/hooks/useAccountDetails";

type PinDetailsScreenProps = {
  route: RouteProp<SearchResultsNavigatorParamList, "PinDetails">;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
};

const PinDetailsScreen = ({ route, navigation }: PinDetailsScreenProps) => {
  const { pin, pinImageAspectRatio } = route.params;

  // Pre-fetch pin author information, so the account details
  // screen renders immediately if the user taps the author's name:
  const accountDetailsQuery = useAccountDetailsQuery({
    username: pin.authorUsername,
  });

  const handlePressAuthor = () => {
    navigation.navigate("AuthorAccountDetails", {
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

export default PinDetailsScreen;
