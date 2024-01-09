import { render, screen, userEvent } from "@testing-library/react-native";
import SearchInputScreenContainer from "./SearchInputScreenContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { Text } from "react-native";

const renderComponent = () => {
  // Here we have to render the screen inside a dummy navigator,
  // otherwise we'll get an error upon render
  // ('Couldn't find a navigation object. Is your component inside NavigationContainer?'),
  // because the screen uses 'useFocusEffect'.
  // We also include a mock base screen and a mock search results screen,
  // to check the navigation behavior of <SearchInputScreenContainer />.

  type DummyStackNavigatorParamList = {
    SearchBase: undefined;
    SearchInput: undefined;
    SearchResults: { searchTerm: string };
  };

  const DummyStackNavigator =
    createStackNavigator<DummyStackNavigatorParamList>();

  const MockSearchBaseScreen = () => <Text>Search base screen.</Text>;

  const MockSearchResultsScreen = ({
    route,
  }: {
    route: RouteProp<DummyStackNavigatorParamList, "SearchResults">;
  }) => <Text>Search results for term: {route.params.searchTerm}</Text>;

  render(
    <NavigationContainer>
      <DummyStackNavigator.Navigator>
        <DummyStackNavigator.Screen
          name="SearchInput"
          component={SearchInputScreenContainer}
        />
        <DummyStackNavigator.Screen
          name="SearchBase"
          component={MockSearchBaseScreen}
        />
        <DummyStackNavigator.Screen
          name="SearchResults"
          component={MockSearchResultsScreen}
        />
      </DummyStackNavigator.Navigator>
    </NavigationContainer>,
  );
};

it("should navigate to base screen when pressing 'Cancel'", async () => {
  // TODO
});

it(`should render with empty value in search input and no clear icon initially,
update value and display clear icon when user types, and clear value and hide
clear icon when user presses clear icon`, async () => {
  jest.useFakeTimers();

  renderComponent();

  const searchInput = screen.getByTestId("search-input");

  expect(searchInput.props.value).toEqual("");
  expect(screen.queryByTestId("search-input-clear-icon")).toBeNull();

  await userEvent.type(searchInput, "abc");

  expect(searchInput.props.value).toEqual("abc");

  const clearIcon = screen.getByTestId("search-input-clear-icon");
  await userEvent.press(clearIcon);

  expect(searchInput.props.value).toEqual("");
  expect(screen.queryByTestId("search-input-clear-icon")).toBeNull();

  jest.useRealTimers();
});
