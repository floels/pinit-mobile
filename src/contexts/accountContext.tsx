import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { AccountPrivateDetails } from "@/src/lib/types";

type AccountContextType = {
  account: AccountPrivateDetails | null;
  setAccount: Dispatch<SetStateAction<AccountPrivateDetails | null>>;
};

export const AccountContext = createContext<AccountContextType>({
  account: null,
  setAccount: () => {},
});

export const AccountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<AccountPrivateDetails | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
