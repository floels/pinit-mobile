import { AuthenticationContextProvider } from "./src/contexts/authenticationContext";

import NavigationContainer from "@/src/components/NavigationContainer/NavigationContainer";

import "./src/lib/i18n";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <NavigationContainer />
      </AuthenticationContextProvider>
    </QueryClientProvider>
  );
};

export default App;
