import Axios from "axios";

import { API_URL, PAYSTACK_KEY } from "@/config";

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_KEY}`,
  },
});
