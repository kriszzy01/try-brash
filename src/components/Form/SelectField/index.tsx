import clsx from "clsx";
import { FieldWrapper, FieldWrapperPassThroughProps } from "../FieldWrapper";

import style from "./style.module.scss";

import { Bank } from "@/features/payments/types";

type ExtendedTypes = React.SelectHTMLAttributes<HTMLSelectElement> &
  FieldWrapperPassThroughProps;

interface SelectFieldProps extends ExtendedTypes {
  options: Bank[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  id: string;
}

export const SelectField = ({
  label,
  options,
  error,
  className,
  defaultValue,
  placeholder,
  id,
  ...props
}: SelectFieldProps) => {
  const styleClassName = clsx({ [style["select"]]: true, className });

  return (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <select placeholder={placeholder} className={styleClassName} {...props}>
        {options.map(({ code, name, id }) => (
          <option key={id} value={code}>
            {name}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
