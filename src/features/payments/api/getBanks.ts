import { axios } from "@/lib/axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { setBanks } from "@/slices/banks";

export const getBanks = () => {
  return axios.get("/bank");
};

export const useBanks = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["banks"],
    queryFn: () => getBanks(),
    onSuccess: ({ data }) => dispatch(setBanks(data.data as any)),
    suspense: false,
  });
};
