import { FlatList, View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchSuggestionsList.styles";

import { MAX_SUGGESTIONS_TO_RENDER } from "@/src/screens/SearchInputScreenContainer";

type SearchSuggestionsListProps = {
  suggestions: string[];
};

const SearchSuggestionsList = ({ suggestions }: SearchSuggestionsListProps) => {
  const renderSuggestionItem = ({ item }: { item: string }) => (
    <View style={styles.suggestionContainer} testID="search-suggestion-item">
      <FontAwesome5 name="search" size={16} style={styles.suggestionIcon} />
      <Text style={styles.suggestionText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(_, index) => `search-suggestion-item-${index + 1}`}
        initialNumToRender={MAX_SUGGESTIONS_TO_RENDER}
      />
    </View>
  );
};

export default SearchSuggestionsList;
