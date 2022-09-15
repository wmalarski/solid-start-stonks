import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { Invoices } from "~/modules/Invoices/Invoices";
import { mockInvoices } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoices(10));
  return data;
};

const InvoicesPage: Component = () => {
  const data = useRouteData<typeof routeData>();

  return <Invoices invoices={data()} />;
};

export default InvoicesPage;
