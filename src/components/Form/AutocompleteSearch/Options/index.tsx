import * as React from "react";
import { motion } from "framer-motion";

import style from "./style.module.scss";

import { Bank } from "@/features/payments/types";

interface OptionsProps {
  results: Bank[];
  handleClick: (code: string, bank: string) => void;
}

export const Options = ({ handleClick, results }: OptionsProps) => {
  return (
    <motion.div
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      className={style["option"]}
      aria-expanded={true}
    >
      <ul role="listbox">
        {results.map((option, index) => (
          <li
            role="option"
            tabIndex={-1}
            className={style["option__list"]}
            key={option.id}
            onClick={() => handleClick(option.code, option.name)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
