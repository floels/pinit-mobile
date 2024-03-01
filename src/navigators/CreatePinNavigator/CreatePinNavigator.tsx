import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EnterPinDetailsScreenContainer from "./EnterPinDetailsScreenContainer";
import SelectPinImageScreenContainer from "./SelectPinImageScreenContainer";
import { AuthenticatedNavigatorParamList } from "../AuthenticatedNavigator/AuthenticatedNavigator";

import { PinWithBasicDetails } from "@/src/lib/types";

export type CreatePinNavigatorParamList = {
  SelectImage: undefined;
  EnterPinDetails: {
    selectedImageURI: string;
    providedImageAspectRatio: number | null;
  };
};

type CreatePinNavigatorProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatePinNavigator = (props: CreatePinNavigatorProps) => {
  const StackNavigator = createStackNavigator<CreatePinNavigatorParamList>();

  const handleCreateSuccess = ({
    createdPin,
    createdPinImageAspectRatio,
  }: {
    createdPin: PinWithBasicDetails;
    createdPinImageAspectRatio: number;
  }) => {
    props.navigation.navigate("Main", {
      createdPin,
      createdPinImageAspectRatio,
    });
  };

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="SelectImage">
        {({ navigation }) => (
          <SelectPinImageScreenContainer
            handlePressClose={props.navigation.goBack}
            navigation={navigation}
          />
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="EnterPinDetails">
        {({ navigation, route }) => (
          <EnterPinDetailsScreenContainer
            navigation={navigation}
            route={route}
            handleCreateSuccess={handleCreateSuccess}
          />
        )}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default CreatePinNavigator;
