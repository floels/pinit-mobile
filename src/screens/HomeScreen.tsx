import { Text, View, Button } from "react-native";

type HomeScreenProps = {
  handlePressLogOut: () => void;
};

const HomeScreen = ({ handlePressLogOut }: HomeScreenProps) => {
  return (
    <View>
      <Text>You are logged in!</Text>
      <Button onPress={handlePressLogOut} title="Log out" />
    </View>
  );
};

export default HomeScreen;
