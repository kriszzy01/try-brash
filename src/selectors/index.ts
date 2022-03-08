import { RootState } from "@/slices";

export const bankSlice = (state: RootState) => state.banks;
export const accountSlice = (state: RootState) => state.userAccount;
export const notificationsSlice = (state: RootState) => state.notifications;
export const paymentsSlice = (state: RootState) => state.payments;
