import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bank {
  name: string;
  code: string;
  id: string;
  type: string;
  currency: "NGN" | "GH";
}

type BankState = {
  banks: Record<string, Bank>;
};

export const initialState: BankState = {
  banks: {},
};

const bankSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setBanks: (state: BankState, { payload }: PayloadAction<Bank[]>) => {
      let bankList = payload.reduce((prev, next) => {
        return { ...prev, [next.id]: next };
      }, {});

      state.banks = bankList;
    },
  },
});

export const { setBanks } = bankSlice.actions;

export default bankSlice.reducer;
