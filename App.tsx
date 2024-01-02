import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AuthenticatedNavigator from "./src/navigators/AuthenticatedNavigator";
import UnauthenticatedNavigator from "./src/navigators/UnauthenticatedNavigator";

import "./src/lib/i18n";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePressLogIn = () => {
    setIsAuthenticated(true);
  };

  const handlePressLogOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator handlePressLogOut={handlePressLogOut} />
      ) : (
        <UnauthenticatedNavigator handlePressLogIn={handlePressLogIn} />
      )}
    </NavigationContainer>
  );
};

export default App;
