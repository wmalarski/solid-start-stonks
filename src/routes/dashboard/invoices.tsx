import { useI18n } from "@solid-primitives/i18n";
import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { Invoices } from "~/modules/Invoices/Invoices";
import { InvoicesTopbar } from "~/modules/InvoicesTopbar/InvoicesTopbar";
import { mockInvoices } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoices(10));
  return data;
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoicesTopbar />
      <h1 class="px-8 text-3xl font-semibold">{t("invoices.header")}</h1>
      <Invoices invoices={data()} />;
    </div>
  );
};

export default InvoicesPage;
