import { useI18n } from "@solid-primitives/i18n";
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
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoiceTopbar invoice={data()} />
      <h1 class="px-8 text-3xl font-semibold print:invisible print:hidden">
        {t("invoice.title", { title: data().invoiceTitle })}
      </h1>
      <div class="[@media_not_print]:card [@media_not_print]:card-compact [@media_not_print]:mx-8 [@media_not_print]:shadow-xl">
        <div class="[@media_not_print]:card-body [@media_not_print]:p-0">
          <InvoiceDetails invoice={data()} />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
