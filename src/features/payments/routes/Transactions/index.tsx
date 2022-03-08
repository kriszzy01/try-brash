import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import style from "./style.module.scss";

import { Table } from "@/components/Elements/Table";
import { Button } from "@/components/Elements";

import { paymentsSlice } from "@/selectors";
import { DetailsDialog } from "../../components/DetailsDialog";

const columns = [
  { title: "Name", field: "name" },
  { title: "Description", field: "description" },
  { title: "Account", field: "account" },
  { title: "Details", field: "details" },
];

export const Transactions = () => {
  const { transfers } = useSelector(paymentsSlice);

  const data = Object.values(transfers).map((transaction, index) => {
    const { name, details, transactionId, description } = transaction;

    return {
      id: transactionId,
      name,
      description,
      account: details.account_number,
      details: (
        <DetailsDialog
          trigger={<Button variant="inverse">View details</Button>}
          id={transactionId}
        />
      ),
    };
  });

  return (
    <div className={style["payments"]}>
      <div className={style["payments__table"]}>
        <Table data={data} columns={columns as any} />
      </div>
    </div>
  );
};
