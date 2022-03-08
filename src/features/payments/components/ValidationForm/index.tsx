import { Formik, Form } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import style from "./style.module.scss";

import { Button } from "@/components/Elements";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";

import { useVerifyAccount } from "../../api/verifyAccount";

import { FormSteps } from "../../types";
import { bankSlice } from "@/selectors";
import { setAccount } from "@/slices/account";
import { useBanks } from "../../api/getBanks";
import { addNotification } from "@/slices/notifications";
import { AutocompleteSearch } from "@/components/Form/AutocompleteSearch";

interface ValidationFormProps {
  handleSubmit: (step: FormSteps) => void;
}

export const ValidationForm = ({ handleSubmit }: ValidationFormProps) => {
  useBanks(); //get bank list
  const banks = useSelector(bankSlice);
  const dispatch = useDispatch();
  const { mutateAsync } = useVerifyAccount();

  const sortedBankList = Object.values(banks.banks).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const initialFormValues = {
    bankCode: "",
    accountNumber: "",
  };

  const onSubmit = async ({
    accountNumber,
    bankCode,
  }: typeof initialFormValues) => {
    try {
      const { data } = await mutateAsync({
        bank_code: bankCode,
        account_number: accountNumber,
      });
      dispatch(setAccount(data.data));
      handleSubmit("payment");
    } catch (error) {
      dispatch(
        addNotification({
          title: "Error",
          message:
            "Something went wrong. Please check your account details and try again.",
          variant: "error",
        })
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: 0, transition: {} }}
        exit={{ x: -50 }}
        className={style["validation"]}
      >
        <div className={style["validation__form"]}>
          <h2 className={style["validation__form-title"]}>
            Validate Account Details
          </h2>

          <Formik
            initialValues={initialFormValues}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              accountNumber: yup
                .string()
                .required("Account number is required")
                .min(10, "Account number must be 8 characters or more"),
              bankCode: yup.string().required("Bank is required"),
            })}
          >
            {(props) => (
              <Form>
                <AutocompleteSearch
                  options={sortedBankList as any}
                  id="bank"
                  name="bankCode"
                  error={props.errors.bankCode}
                  handleClick={props.setFieldValue}
                  onBlur={props.handleBlur}
                  label="Beneficiary Bank"
                  value={props.values.bankCode}
                  placeholder="eg. Access Bank"
                />

                <InputField
                  id="accountnumber"
                  name="accountNumber"
                  error={props.errors.accountNumber}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.accountNumber}
                  label="Beneficiary Account Number"
                  placeholder="eg. 2124859881"
                />

                <div className={style["validation__form-button"]}>
                  <Button type="submit" isLoading={props.isSubmitting}>
                    Validate
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
