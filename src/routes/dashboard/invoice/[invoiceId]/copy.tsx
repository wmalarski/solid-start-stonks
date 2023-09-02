import { useI18n } from "@solid-primitives/i18n";
import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useNavigate, useParams } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import {
  InvoiceForm,
  type InvoiceFormData,
} from "~/modules/invoices/InvoiceForm";
import { InvoiceTopbar } from "~/modules/invoices/InvoiceTopbar";
import {
  insertInvoiceServerMutation,
  selectAllInvoicesKey,
  selectInvoiceKey,
  selectInvoiceServerQuery,
} from "~/server/invoices/actions";
import { getServerError } from "~/utils/errors";
import { paths } from "~/utils/paths";

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const params = useParams();
  const navigate = useNavigate();

  const id = () => +params.invoiceId;

  const queryClient = useQueryClient();

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => selectInvoiceServerQuery(context.queryKey),
    queryKey: selectInvoiceKey({ id: id() }),
    suspense: true,
  }));

  const insertMutation = createMutation(() => ({
    mutationFn: insertInvoiceServerMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: selectAllInvoicesKey(),
      });

      navigate(paths.invoice(+data.id));
    },
  }));

  const onSubmit = (data: InvoiceFormData) => {
    insertMutation.mutate(data);
  };

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoiceQuery.data}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar
                invoice={invoice()}
                invoiceId={id()}
                breadcrumbs={[
                  {
                    path: paths.copyInvoice(id()),
                    text: t("topbar.copyInvoice"),
                  },
                ]}
              />
              <h1 class="px-8 text-3xl font-semibold">
                {t("copyInvoice.header")}
              </h1>
              <div class="p-8 pt-0">
                <InvoiceForm
                  error={getServerError(insertMutation.error)}
                  initial={invoice()}
                  isLoading={insertMutation.isPending}
                  onSubmit={onSubmit}
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
