import { useQuery } from "@tanstack/react-query";

import {
  API_BASE_URL,
  API_ENDPOINT_ACCOUNT_DETAILS,
} from "@/src/lib/constants";
import { ResponseKOError } from "@/src/lib/customErrors";
import { getAccountWithCamelCaseKeys } from "@/src/lib/utils/serializers";

const fetchAccountDetails = async ({ username }: { username: string }) => {
  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINT_ACCOUNT_DETAILS}/${username}/`,
  );

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
