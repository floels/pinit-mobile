import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EnterPinDetailsScreen from "./EnterPinDetailsScreen";
import SelectPinImageScreen from "./SelectPinImageScreen";
import { AuthenticatedNavigatorParamList } from "../AuthenticatedNavigator/AuthenticatedNavigator";

export type CreatePinNavigatorParamList = {
  SelectImage: undefined;
  EnterPinDetails: { selectedImageURI: string };
};

type CreatePinNavigatorProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatePinNavigator = (props: CreatePinNavigatorProps) => {
  const StackNavigator = createStackNavigator<CreatePinNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="SelectImage">
        {({ navigation }) => (
          <SelectPinImageScreen
            handlePressClose={props.navigation.goBack}
            navigation={navigation}
          />
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen
        name="EnterPinDetails"
        component={EnterPinDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default CreatePinNavigator;
