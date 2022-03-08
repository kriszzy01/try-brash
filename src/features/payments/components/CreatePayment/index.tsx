import { Formik, Form, FormikProps } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

import style from "./style.module.scss";

import { Button } from "@/components/Elements";
import { InputField } from "@/components/Form/InputField";
import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";

import { accountSlice } from "@/selectors";
import { bankSlice } from "@/selectors";
import { useDisclosure } from "@/hooks/useDisclosure";

import { useCreateRecipient } from "../../api/createRecipient";
import { PaymentStepsProps } from "../../types";
import { addTransfer } from "@/slices/payments";
import { commify } from "@/utils/commify";

export const CreatePayment = ({ handleSubmit }: PaymentStepsProps) => {
  const { isOpen, handleOpen } = useDisclosure(); //loading indicator for confirm button
  const account = useSelector(accountSlice);
  const { banks } = useSelector(bankSlice);
  const { mutateAsync } = useCreateRecipient();
  const dispatch = useDispatch();

  const accountBank = banks[account.bankId];

  const initialFormValues = {
    amount: "",
    narration: "",
  };

  const handleTransfer = async (
    props: FormikProps<typeof initialFormValues>
  ) => {
    try {
      handleOpen();
      const payload = {
        bank_code: accountBank.code,
        type: accountBank.type,
        name: account.accountName,
        account_number: account.accountNumber,
        currency: accountBank.currency,
        description: props.values.narration,
      };

      const data = await mutateAsync(payload);
      if (data) {
        dispatch(
          addTransfer({ ...data.data.data, amount: props.values.amount })
        );
        handleSubmit("validation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        className={style["payment"]}
      >
        <div>
          <button
            className={style["payment-back-button"]}
            type="button"
            onClick={() => handleSubmit("validation")}
          >
            Back
          </button>
        </div>

        <div className={style["payment__form"]}>
          {/* <h2 className={style["payment__form-title"]}>Process Payment</h2> */}

          <div className={style["payment__form-account"]}>
            <p>Account Name: {account.accountName}</p>
            <p>Bank Name: {accountBank.name}</p>
          </div>

          <Formik
            initialValues={initialFormValues}
            onSubmit={() => {}} //handled by handleTransfer function which is called from the confirm button
            validationSchema={yup.object({
              amount: yup
                .number()
                .required("Amount is required")
                .min(100, "Minimum amount is #100")
                .max(10000000, "Maximum amount is #10000000"),
              narration: yup.string().required("Narration is required"),
            })}
          >
            {(props) => (
              <Form>
                <div>
                  <InputField
                    id="amount"
                    name="amount"
                    error={props.errors.amount}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.amount}
                    label="Amount: Minimum Amount: #100"
                    type="number"
                    placeholder="eg.10000"
                  />
                </div>

                <InputField
                  id="narration"
                  name="narration"
                  error={props.errors.narration}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.narration}
                  label="Narration"
                  type="string"
                  placeholder="eg. Vacation fees"
                />

                <ConfirmationDialog
                  triggerButton={
                    <Button
                      type="submit"
                      disabled={
                        !Boolean(props.values.amount && props.values.narration)
                      }
                    >
                      Proceed
                    </Button>
                  }
                  confirmButton={
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleTransfer(props)}
                      isLoading={isOpen}
                    >
                      Confirm
                    </Button>
                  }
                  title="Confirmation"
                  body={`Are You sure you want transfer ${commify(
                    +props.values.amount
                  )} to ${account.accountName}?`}
                />
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
