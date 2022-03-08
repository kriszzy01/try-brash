import * as React from "react";
import { motion } from "framer-motion";

import style from "./style.module.scss";

import { ValidationForm } from "../../components/ValidationForm";
import { CreatePayment } from "../../components/CreatePayment";
import { FormSteps } from "../../types";

import { Spinner } from "@/components/Elements";

export const Payment = () => {
  const [formStep, setFormStep] = React.useState<FormSteps>("validation");

  const handleNextStep = (step: FormSteps) => setFormStep(step);

  const formSteps: Record<FormSteps, JSX.Element> = {
    validation: <ValidationForm handleSubmit={handleNextStep} />,
    payment: <CreatePayment handleSubmit={handleNextStep} />,
  };

  return (
    <div className={style["payment"]}>
      <div className={style["payment__text"]}>
        <div className={style["payment__text-container"]}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1.5, ease: "linear" },
            }}
          >
            Pay anyone, <br /> anywhere.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1.5, ease: "linear" },
            }}
          >
            Pay family, friends and bills for <br /> less-at home and abroad.
          </motion.p>
        </div>
      </div>

      <React.Suspense
        fallback={
          <div className={style["payment__spinner"]}>
            <Spinner size="lg" variant="light" />
          </div>
        }
      >
        <div className={style["payment__forms"]}>
          <div className={style["payment__forms-inner"]}>
            {/* <div className={style["payment__forms-step"]}>Step</div> */}

            <div className={style["payment__forms-container"]}>
              {formSteps[formStep]}
            </div>
          </div>
        </div>
      </React.Suspense>
    </div>
  );
};
