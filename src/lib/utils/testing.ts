import { screen, userEvent } from "@testing-library/react-native";

export const pressButton = async ({ testID }: { testID: string }) => {
  jest.useFakeTimers();

  const button = screen.getByTestId(testID);

  await userEvent.press(button);

  jest.useRealTimers();
};
