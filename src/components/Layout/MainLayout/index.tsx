import { Helmet } from "react-helmet-async";
import { Link } from "@/components/Elements";

import style from "./style.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Helmet title={"Try Brash"}>
        <meta name="description" content={"Lightning Fast Transactions"} />
      </Helmet>
      <div className={style["layout"]}>
        <header className={style["layout__header"]}>
          <div className={style["layout__header-inner"]}>
            <Link className={style["layout__header-logo"]} to="/">
              Try Brash
            </Link>

            <Link to="/transactions">Your Transactions</Link>
          </div>
        </header>
        <main className={style["layout__main"]}>{children}</main>
      </div>
    </>
  );
};
