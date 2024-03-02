import { RouteProp, NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthorAccountDetailsScreen from "./AuthorAccountDetailsScreen";
import PinDetailsScreen from "./PinDetailsScreen";
import { AuthenticatedNavigatorParamList } from "../AuthenticatedNavigator/AuthenticatedNavigator";

import { Account } from "@/src/lib/types";

type CreatedPinDetailsNavigatorProps = {
  route: RouteProp<AuthenticatedNavigatorParamList, "CreatedPinDetails">;
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

export type CreatedPinDetailsNavigatorParamList = {
  PinDetails: undefined;
  AuthorAccountDetails: {
    accountDetailsQuery: {
      data: Account | undefined;
      isLoading: boolean;
      isError: boolean;
    };
  };
};

const CreatedPinDetailsNavigator = (props: CreatedPinDetailsNavigatorProps) => {
  const { createdPin, createdPinImageAspectRatio } = props.route.params;

  const StackNavigator =
    createStackNavigator<CreatedPinDetailsNavigatorParamList>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="PinDetails">
        {({ navigation }) => (
          <PinDetailsScreen
            createdPin={createdPin}
            createdPinImageAspectRatio={createdPinImageAspectRatio}
            navigation={navigation}
            handlePressClose={props.navigation.goBack}
          />
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen
        name="AuthorAccountDetails"
        component={AuthorAccountDetailsScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default CreatedPinDetailsNavigator;
