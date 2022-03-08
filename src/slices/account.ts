import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountState = {
  accountName: string;
  accountNumber: string;
  bankId: string;
};

export const initialState: AccountState = {
  accountName: "",
  accountNumber: "",
  bankId: "",
};

const accountSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setAccount: (state: AccountState, { payload }: PayloadAction<any>) => {
      state.accountName = payload.account_name;
      state.accountNumber = payload.account_number;
      state.bankId = payload.bank_id;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
