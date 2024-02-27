import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./src/lib/i18n";
import Toast from "react-native-toast-message";

import { AuthenticationContextProvider } from "./src/contexts/authenticationContext";

import NavigationContainer from "@/src/components/NavigationContainer/NavigationContainer";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthenticationContextProvider>
          <NavigationContainer />
        </AuthenticationContextProvider>
      </QueryClientProvider>
      <Toast />
    </>
  );
};

export default App;
