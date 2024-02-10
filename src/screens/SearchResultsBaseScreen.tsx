import { NavigationProp } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchResultsBaseScreen.styles";
import PinsBoardContainer from "../components/PinsBoard/PinsBoardContainer";
import { API_ENDPOINT_SEARCH } from "../lib/constants";
import { PinType } from "../lib/types";
import { SearchResultsNavigatorParamList } from "../navigators/SearchResultsNavigator";

type SearchResultsBaseScreenProps = {
  searchTerm: string;
  navigation: NavigationProp<SearchResultsNavigatorParamList>;
  handlePressBack: () => void;
};

const SearchResultsBaseScreen = ({
  searchTerm,
  navigation,
  handlePressBack,
}: SearchResultsBaseScreenProps) => {
  const searchEndpoint = `${API_ENDPOINT_SEARCH}/?q=${searchTerm.toLowerCase()}`;

  const getTapHandlerForPin = ({
    pin,
    pinImageAspectRatio,
  }: {
    pin: PinType;
    pinImageAspectRatio: number;
  }) => {
    return () => {
      navigation.navigate("PinDetails", { pin, pinImageAspectRatio });
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonAndSearchTerm}>
        <TouchableOpacity onPress={handlePressBack} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            // TODO: implement
            () => {}
          }
          style={styles.searchTerm}
        >
          <Text>{searchTerm}</Text>
        </TouchableOpacity>
      </View>
      <PinsBoardContainer
        fetchEndpoint={searchEndpoint}
        getTapHandlerForPin={getTapHandlerForPin}
      />
    </View>
  );
};

export default SearchResultsBaseScreen;
