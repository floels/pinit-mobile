import { useState } from "react";

import AccessTokenRefresher from "./AccessTokenRefresher";
import AccountDetailsFetcher from "./AccountDetailsFetcher";

const AuthenticatedSetupBuilder = () => {
  const [
    hasFinishedFetchingRefreshedToken,
    setHasFinishedFetchingRefreshedToken,
  ] = useState(false);

  if (!hasFinishedFetchingRefreshedToken) {
    return (
      <AccessTokenRefresher
        setHasFinishedFetching={setHasFinishedFetchingRefreshedToken}
      />
    );
  }

  return <AccountDetailsFetcher />;
};

export default AuthenticatedSetupBuilder;
