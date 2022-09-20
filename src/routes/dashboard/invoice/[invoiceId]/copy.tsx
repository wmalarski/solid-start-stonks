import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { findInvoice } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$((source) => findInvoice.fn(source), {
    key: findInvoice.key(params.invoiceId),
  });
};

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <LoadingSwitch
      resource={data}
      fallback={<Navigate href={paths.notFound} />}
    >
      {(invoice) => (
        <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
          <InvoiceTopbar
            invoice={invoice}
            breadcrumbs={[
              {
                path: paths.copyInvoice(invoice.id),
                text: t("topbar.copyInvoice"),
              },
            ]}
          />
          <h1 class="px-8 text-3xl font-semibold">{t("copyInvoice.header")}</h1>
          <div class="p-8 pt-0">
            <InvoiceForm
              error=""
              isLoading={false}
              onSubmit={() => void 0}
              initial={invoice}
            />
          </div>
        </div>
      )}
    </LoadingSwitch>
  );
};

export default CopyInvoicePage;
