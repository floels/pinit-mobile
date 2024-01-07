import { FlatList, View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchSuggestionsList.styles";

type SearchSuggestionsListProps = {
  suggestions: string[];
};

const SearchSuggestionsList = ({ suggestions }: SearchSuggestionsListProps) => {
  const renderSuggestionItem = ({ item }: { item: string }) => (
    <View style={styles.suggestionContainer}>
      <FontAwesome5 name="search" size={16} style={styles.suggestionIcon} />
      <Text style={styles.suggestionText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={suggestions} renderItem={renderSuggestionItem} />
    </View>
  );
};

export default SearchSuggestionsList;
