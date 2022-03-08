import { axios } from "@/lib/axios";
import { useMutation } from "react-query";

export type VerifyAccountData = {
  account_number: string;
  bank_code: string;
};

export const verifyAccount = ({
  account_number,
  bank_code,
}: VerifyAccountData): Promise<any> => {
  return axios.get("/bank/resolve", {
    params: {
      account_number,
      bank_code,
    },
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
    onError: (data) => console.log(data),
  });
};
