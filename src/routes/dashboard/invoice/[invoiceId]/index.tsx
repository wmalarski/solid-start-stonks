import { useI18n } from "@solid-primitives/i18n";
import { createQuery } from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useParams } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoiceDetails } from "~/modules/invoices/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/invoices/InvoiceTopbar";
import { selectInvoiceKey, selectInvoiceServerQuery } from "~/server/invoices";
import { paths } from "~/utils/paths";

const InvoicePage: Component = () => {
  const [t] = useI18n();

  const params = useParams();

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => selectInvoiceServerQuery(context.queryKey),
    queryKey: selectInvoiceKey({ id: params.invoiceId }),
  }));

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoiceQuery.data}>
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
