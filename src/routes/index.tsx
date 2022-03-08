import * as React from "react";
import { useRoutes, Outlet } from "react-router-dom";

import { NotFound } from "@/features/misc";

import { Spinner } from "@/components/Elements";
import { MainLayout } from "@/components/Layout/MainLayout";

import { lazyImport } from "@/utils/lazyImport";

const { Payment } = lazyImport(() => import("@/features/payments"), "Payment");
const { Transactions } = lazyImport(
  () => import("@/features/payments"),
  "Transactions"
);

function Layout() {
  return (
    <MainLayout>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <Outlet />
      </React.Suspense>
    </MainLayout>
  );
}

export const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Payment /> },
        { path: "/transactions", element: <Transactions /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
