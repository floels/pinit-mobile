import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { AccountPublicDetails } from "@/src/lib/types";

type State = {
  account: AccountPublicDetails | null;
};

type Action = {
  type: "FETCHED_ACCOUNT_DETAILS";
  accountDetails: AccountPublicDetails;
};

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const initialState = {
  account: null,
};

export const AccountContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {}, // placeholder function
});

const reducer = (state: State, action: Action) => {
  if (action.type === "FETCHED_ACCOUNT_DETAILS") {
    return {
      account: { ...action.accountDetails },
    };
  }
  return state;
};

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error(
      "'useAccountContext' must be used within an AccountContextProvider",
    );
  }

  return context;
};
