import { axios } from "@/lib/axios";
import { useMutation } from "react-query";

export const initiateTransfer = (recipient: string): Promise<any> => {
  let data = {
    source: "balance",
    amount: 3794800,
    recipient,
    currency: "NGN",
    reason: "",
    reference: "",
  };
  return axios.post("/transfer", data);
};

export const useInitiateTransfer = () => {
  return useMutation({
    mutationFn: initiateTransfer,
    onError: (data) => console.log(data),
    onMutate: async (response) => {
      console.log(response);
    },
    onSuccess: (data) => console.log(data),
  });
};
