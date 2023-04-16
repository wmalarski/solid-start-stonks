import { useI18n } from "@solid-primitives/i18n";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useRouteData, type RouteDataArgs } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoiceForm } from "~/modules/invoices/InvoiceForm";
import { InvoiceTopbar } from "~/modules/invoices/InvoiceTopbar";
import {
  createInsertInvoiceServerAction,
  createInvoiceServerData,
  selectInvoiceKey,
} from "~/server/invoices";
import { getServerError } from "~/utils/errors";
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
                  error={getServerError(copy.error)}
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
