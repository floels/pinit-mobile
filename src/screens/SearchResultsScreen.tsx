import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchResultsScreen.styles";

type SearchResultsScreenProps = {
  searchTerm: string;
  onPressBack: () => void;
};

const SearchResultsScreen = ({
  searchTerm,
  onPressBack,
}: SearchResultsScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonAndSearchTerm}>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <View style={styles.searchTerm}>
          <Text>{searchTerm}</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchResultsScreen;
