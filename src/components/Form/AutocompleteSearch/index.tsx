import * as React from "react";
import { FieldWrapper, FieldWrapperPassThroughProps } from "../FieldWrapper";

import style from "./style.module.scss";

import { Bank } from "@/features/payments/types";
import { Options } from "./Options";
import { AnimatePresence } from "framer-motion";
import { useDisclosure } from "@/hooks/useDisclosure";
import { FormikHelpers } from "formik";

type ExtendedTypes = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps;

interface AutocompleteSearchProps extends ExtendedTypes {
  options: Bank[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  id: string;
  handleClick: FormikHelpers<{
    bankCode: string;
    accountNumber: string;
  }>["setFieldValue"];
}

export const AutocompleteSearch = ({
  label,
  options,
  error,
  className,
  defaultValue,
  placeholder,
  id,
  handleClick,
  onChange,
  ...props
}: AutocompleteSearchProps) => {
  const [searchterm, setSearchterm] = React.useState("");
  const { isOpen: isInputFocus, handleClose, handleOpen } = useDisclosure();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchterm(event.target.value);
    handleOpen();
  };

  const searchResult = options.filter((option) => {
    let term = option.name.toLowerCase();

    return term.toLowerCase().includes(searchterm.toLowerCase());
  });

  return (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <input
        type="search"
        aria-label="Search for bank"
        aria-controls="options"
        value={searchterm}
        placeholder="eg. Access"
        onChange={handleChange}
        onBlur={() => setTimeout(handleClose, 200)}
        className={style["autocomplete"]}
        id={id}
      />
      <AnimatePresence>
        {isInputFocus && (
          <Options
            results={searchResult}
            handleClick={(code, bank) => {
              handleClick("bankCode", code);
              setSearchterm(bank);
            }}
          />
        )}
      </AnimatePresence>
    </FieldWrapper>
  );
};
