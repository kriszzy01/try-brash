import * as React from "react";
import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";

import close from "@/assets/close.svg";

import style from "./style.module.scss";

import { Dialog } from "@/components/Elements";

import { useDisclosure } from "@/hooks/useDisclosure";
import { paymentsSlice } from "@/selectors";

interface DetailsModalProp {
  trigger: React.ReactElement;
  id: string;
}

export const DetailsDialog = ({ trigger, id }: DetailsModalProp) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const { transfers } = useSelector(paymentsSlice);

  const triggerButton = React.cloneElement(trigger, { onClick: handleOpen });
  const transfer = transfers[id];

  return (
    <>
      <div className={style["dialog-trigger"]}>{triggerButton}</div>
      <Dialog isOpen={isOpen} handleClose={handleClose} fillPage={true}>
        <div className={style["dialog"]}>
          <div className={style["dialog-header"]}>
            <div className={style["dialog-header-content"]}>
              <h2>Transaction Detail</h2>
              <div className={style["dialog-header-content-text"]}>
                <p>Recipient Code: {transfer.recipient_code}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="close"
              onClick={handleClose}
              className={style["dialog-close-button"]}
            >
              <SVG src={close} width={32} height={32} />
            </button>
          </div>

          <div className={style["dialog-section"]}>
            <hr />
            <h3>Description</h3>
            <div className={style["dialog-section-text"]}>
              <p>Narration: {transfer.description}</p>
              <p>Amount: {transfer.amount}</p>
              <p>Currency: {transfer.currency}</p>
              <p>Date: {new Date(transfer.createdAt).toDateString()}</p>
              <p>Time: {new Date(transfer.createdAt).toTimeString()}</p>
            </div>
          </div>

          <div className={style["dialog-section"]}>
            <hr />
            <h3>Bank Details</h3>
            <div className={style["dialog-section-text"]}>
              <p>Bank Name: {transfer.details.bank_name}</p>
              <p>Account Holder: {transfer.details.account_name}</p>
              <p>Account Number: {transfer.details.account_number}</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
