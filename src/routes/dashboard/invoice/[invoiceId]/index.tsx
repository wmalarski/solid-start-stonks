import { useI18n } from "@solid-primitives/i18n";
import { Component, ErrorBoundary, Show, Suspense } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoiceDetails } from "~/modules/InvoiceDetails/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { createInvoiceServerData, selectInvoiceKey } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createInvoiceServerData(() =>
    selectInvoiceKey({ id: params.invoiceId })
  );
};

const InvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={data()}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar invoice={invoice()} />
              <h1 class="px-8 text-3xl font-semibold print:invisible print:hidden">
                {t("invoice.title", { title: invoice().invoice_title })}
              </h1>
              <div class="[@media_not_print]:card [@media_not_print]:card-compact [@media_not_print]:m-8 [@media_not_print]:mt-0 [@media_not_print]:shadow-xl">
                <div class="[@media_not_print]:card-body [@media_not_print]:p-0">
                  <InvoiceDetails invoice={invoice()} />
                </div>
              </div>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default InvoicePage;
