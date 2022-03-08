import { axios } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { addNotification } from "@/slices/notifications";

interface CreateRecipientData {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency: string;
}

export const createRecipient = (recipient: CreateRecipientData) => {
  return axios.post("/transferrecipient", recipient);
};

export const useCreateRecipient = () => {
  const dispatch = useDispatch();

  return useMutation({
    onError: () => {
      new Promise((resolve) => {
        dispatch(
          addNotification({
            message: "Error",
            title: "Transfer unsuccessful, please try again later",
            variant: "error",
          })
        );
        resolve("");
      });
    },
    mutationFn: createRecipient,
    onSuccess: () => {
      new Promise((resolve) => {
        dispatch(
          addNotification({
            title: "Success!",
            message:
              "Transfer successful, please check the transactions page for details.",
            variant: "info",
          })
        );

        resolve(null);
      });
    },
  });
};
