import { useI18n } from "@solid-primitives/i18n";
import { Component, ErrorBoundary, Show, Suspense } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner/LoadingSpinner";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import {
  createInsertInvoiceServerAction,
  createInvoiceServerData,
  selectInvoiceKey,
} from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createInvoiceServerData(() =>
    selectInvoiceKey({ id: params.invoiceId })
  );
};

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [copy, submit] = createInsertInvoiceServerAction();

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={data()}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar
                invoice={invoice()}
                breadcrumbs={[
                  {
                    path: paths.copyInvoice(invoice().id),
                    text: t("topbar.copyInvoice"),
                  },
                ]}
              />
              <h1 class="px-8 text-3xl font-semibold">
                {t("copyInvoice.header")}
              </h1>
              <div class="p-8 pt-0">
                <InvoiceForm
                  error={copy.error as string}
                  Form={submit.Form}
                  initial={invoice()}
                  isLoading={copy.pending}
                />
              </div>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CopyInvoicePage;
