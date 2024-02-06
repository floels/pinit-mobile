import { AuthenticationContextProvider } from "./src/contexts/authenticationContext";

import NavigationContainer from "@/src/components/NavigationContainer/NavigationContainer";

import "./src/lib/i18n";

const App = () => {
  return (
    <AuthenticationContextProvider>
      <NavigationContainer />
    </AuthenticationContextProvider>
  );
};

export default App;
