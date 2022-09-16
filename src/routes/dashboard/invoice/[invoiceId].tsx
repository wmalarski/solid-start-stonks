import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { InvoiceDetails } from "~/modules/InvoiceDetails/InvoiceDetails";
import { mockInvoice } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoice());
  return data;
};

const InvoicePage: Component = () => {
  const data = useRouteData<typeof routeData>();

  return <InvoiceDetails invoice={data()} />;
};

export default InvoicePage;
