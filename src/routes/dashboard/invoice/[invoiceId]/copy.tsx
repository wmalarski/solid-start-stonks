import { useI18n } from "@solid-primitives/i18n";
import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { mockInvoice } from "~/tests/mocks";

export const routeData = () => {
  const [data] = createResource(() => mockInvoice());
  return data;
};

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <h1 class="px-8 text-3xl font-semibold">{t("copyInvoice.header")}</h1>
      <InvoiceForm
        error=""
        isLoading={false}
        onSubmit={() => void 0}
        initial={data()}
      />
    </div>
  );
};

export default CopyInvoicePage;
