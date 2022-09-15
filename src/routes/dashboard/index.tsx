import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { mockInvoices } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoices(10));
  return data;
};

const Invoices: Component = () => {
  const data = useRouteData<typeof routeData>();

  return <pre>{JSON.stringify(data(), null, 2)}</pre>;
};

export default Invoices;
