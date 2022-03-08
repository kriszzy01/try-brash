import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

import { Bank } from "../types";

export const getTransfers = (): Promise<Bank[]> => {
  return axios.get("/transfers");
};

export const useTransfers = () => {
  return useQuery({
    queryKey: ["transfers"],
    queryFn: () => getTransfers(),
  });
};
