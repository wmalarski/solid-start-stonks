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
  selectAllInvoicesKey,
  selectInvoiceKey,
  selectInvoiceServerQuery,
  updateInvoiceServerMutation,
} from "~/server/invoices/actions";
import { getServerError } from "~/utils/errors";
import { paths } from "~/utils/paths";

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const params = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const id = () => +params.invoiceId;

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => selectInvoiceServerQuery(context.queryKey),
    queryKey: selectInvoiceKey({ id: id() }),
    suspense: true,
  }));

  const editMutation = createMutation(() => ({
    mutationFn: updateInvoiceServerMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: selectInvoiceKey({ id: id() }),
      });
      queryClient.invalidateQueries({
        queryKey: selectAllInvoicesKey(),
      });

      navigate(paths.invoice(id()));
    },
  }));

  const onSubmit = (data: InvoiceFormData) => {
    editMutation.mutate({ ...data, id: id() });
  };

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
                    path: paths.editInvoice(id()),
                    text: t("topbar.editInvoice"),
                  },
                ]}
              />
              <h1 class="px-8 text-3xl font-semibold">
                {t("editInvoice.header")}
              </h1>
              <div class="p-8 pt-0">
                <InvoiceForm
                  error={getServerError(editMutation.error)}
                  id={id()}
                  initial={invoice()}
                  isLoading={editMutation.isPending}
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

export default EditInvoicePage;
