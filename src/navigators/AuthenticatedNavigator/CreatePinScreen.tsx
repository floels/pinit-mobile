import { NavigationProp } from "@react-navigation/native";

import CreatePinView from "@/src/components/CreatePinView/CreatePinView";
import { AuthenticatedNavigatorParamList } from "@/src/navigators/AuthenticatedNavigator/AuthenticatedNavigator";

type CreatePinScreenProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatePinScreen = ({ navigation }: CreatePinScreenProps) => {
  return <CreatePinView handlePressClose={navigation.goBack} />;
};

export default CreatePinScreen;
