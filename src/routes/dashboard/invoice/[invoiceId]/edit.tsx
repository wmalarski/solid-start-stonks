import { useI18n } from "@solid-primitives/i18n";
import { Component, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { mockInvoice } from "~/tests/mocks";
import { paths } from "~/utils/paths";

export const routeData = () => {
  const [data] = createResource(() => mockInvoice());
  return data;
};

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoiceTopbar
        invoice={data()}
        breadcrumbs={[
          { path: paths.editInvoice(data().id), text: t("topbar.editInvoice") },
        ]}
      />
      <h1 class="px-8 text-3xl font-semibold">{t("editInvoice.header")}</h1>
      <div class="p-8 pt-0">
        <InvoiceForm
          error=""
          isLoading={false}
          onSubmit={() => void 0}
          initial={data()}
        />
      </div>
    </div>
  );
};

export default EditInvoicePage;
