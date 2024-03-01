import { screen, fireEvent } from "@testing-library/react-native";

export const pressButton = ({ testID }: { testID: string }) => {
  const button = screen.getByTestId(testID);

  fireEvent.press(button);
};
