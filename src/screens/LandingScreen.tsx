import { Text, View, Button } from "react-native";

type LandingScreenProps = {
  handlePressLogIn: () => void;
};

const LandingScreen = ({ handlePressLogIn }: LandingScreenProps) => {
  return (
    <View>
      <Text>You are not logged in.</Text>
      <Button onPress={handlePressLogIn} title="Log in" />
    </View>
  );
};

export default LandingScreen;
