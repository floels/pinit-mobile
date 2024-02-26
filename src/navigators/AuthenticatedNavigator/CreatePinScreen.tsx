import { NavigationProp } from "@react-navigation/native";

import { AuthenticatedNavigatorParamList } from "@/src/navigators/AuthenticatedNavigator/AuthenticatedNavigator";
import CreatePinView from "@/src/components/CreatePinView/CreatePinView";

type CreatePinScreenProps = {
  navigation: NavigationProp<AuthenticatedNavigatorParamList>;
};

const CreatePinScreen = ({ navigation }: CreatePinScreenProps) => {
  return <CreatePinView handlePressClose={navigation.goBack} />;
};

export default CreatePinScreen;
