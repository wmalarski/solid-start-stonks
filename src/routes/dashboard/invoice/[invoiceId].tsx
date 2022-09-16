import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { InvoiceDetails } from "~/modules/InvoiceDetails/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { mockInvoice } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoice());
  return data;
};

const InvoicePage: Component = () => {
  const data = useRouteData<typeof routeData>();

  return (
    <div class="grid grid-cols-1 w-full items-start">
      <InvoiceTopbar invoice={data()} />
      <InvoiceDetails invoice={data()} />
    </div>
  );
};

export default InvoicePage;
