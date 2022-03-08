import { BaseEntry } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface RecipientResponse extends BaseEntry {
  currency: string;
  name: string;
  recipient_code: string;
  type: string;
  is_deleted: boolean;
  description: string;
  details: {
    authorization_code: null;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
  };
  amount: string;
  transactionId: string;
}

interface PaymentsState {
  transfers: Record<string, RecipientResponse>;
}

export const initialState: PaymentsState = {
  transfers: {},
};

const paymentsSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    addTransfer: (
      state: PaymentsState,
      { payload }: PayloadAction<RecipientResponse>
    ) => {
      let id = nanoid();
      state.transfers[id] = { ...payload, transactionId: id };
    },
  },
});

export const { addTransfer } = paymentsSlice.actions;

export default paymentsSlice.reducer;
