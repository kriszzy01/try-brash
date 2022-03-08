import { BaseEntry } from "@/types";

export type FormSteps = "validation" | "payment";

export interface Bank extends BaseEntry {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: null | string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
}

export interface Transfer extends BaseEntry {
  status: boolean;
  message: string;
  data: {
    integration: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
  };
}

export interface PaymentStepsProps {
  handleSubmit: (step: FormSteps) => void;
}
