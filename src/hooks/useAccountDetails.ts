import { useContext } from "react";
import { AuthenticationContext } from "../contexts/authenticationContext";
import { API_BASE_URL, API_ENDPOINT_ACCOUNT_DETAILS } from "../lib/constants";
import { Response401Error, ResponseKOError } from "../lib/customErrors";
import { getAccountWithCamelCaseKeys } from "../lib/utils/serializers";
import { useQuery } from "@tanstack/react-query";

const fetchAccountDetails = async ({ username }: { username: string }) => {
  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINT_ACCOUNT_DETAILS}/${username}/`,
  );

  if (response.status === 401) {
    const { dispatch } = useContext(AuthenticationContext);

    dispatch({ type: "GOT_401_RESPONSE" });

    throw new Response401Error();
  }

  if (!response.ok) {
    throw new ResponseKOError();
  }

  const responseData = await response.json();

  return getAccountWithCamelCaseKeys(responseData);
};

export const useAccountDetailsQuery = ({ username }: { username: string }) => {
  return useQuery({
    queryKey: ["accountDetails", username],
    queryFn: () => fetchAccountDetails({ username }),
  });
};
