import { useI18n } from "@solid-primitives/i18n";
import { createQuery } from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useParams } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoiceForm } from "~/modules/invoices/InvoiceForm";
import { InvoiceTopbar } from "~/modules/invoices/InvoiceTopbar";
import {
  createUpdateInvoiceServerAction,
  queryInvoice,
  selectInvoiceKey,
} from "~/server/invoices";
import { getServerError } from "~/utils/errors";
import { paths } from "~/utils/paths";

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const params = useParams();

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => queryInvoice(context.queryKey),
    queryKey: selectInvoiceKey({ id: params.invoiceId }),
  }));

  const [edit, submit] = createUpdateInvoiceServerAction();

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoiceQuery.data}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar
                invoice={invoice()}
                breadcrumbs={[
                  {
                    path: paths.editInvoice(invoice().id),
                    text: t("topbar.editInvoice"),
                  },
                ]}
              />
              <h1 class="px-8 text-3xl font-semibold">
                {t("editInvoice.header")}
              </h1>
              <div class="p-8 pt-0">
                <InvoiceForm
                  error={getServerError(edit.error)}
                  id={invoice().id}
                  isLoading={edit.pending}
                  Form={submit.Form}
                  initial={invoice()}
                />
              </div>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default EditInvoicePage;
