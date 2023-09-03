import { useI18n } from "@solid-primitives/i18n";
import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useNavigate, useParams } from "solid-start";
import { coerce, number } from "valibot";
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
import { safeParseOrNull } from "~/utils/validation";

type EditInvoiceQueryProps = {
  id: number;
};

const EditInvoiceQuery: Component<EditInvoiceQueryProps> = (props) => {
  const [t] = useI18n();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => selectInvoiceServerQuery(context.queryKey),
    queryKey: selectInvoiceKey({ id: props.id }),
    suspense: true,
  }));

  const editMutation = createMutation(() => ({
    mutationFn: updateInvoiceServerMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: selectInvoiceKey({ id: props.id }),
      });
      queryClient.invalidateQueries({
        queryKey: selectAllInvoicesKey(),
      });

      navigate(paths.invoice(props.id));
    },
  }));

  const onSubmit = (data: InvoiceFormData) => {
    editMutation.mutate({ ...data, id: props.id });
  };

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoiceQuery.data}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar
                invoice={invoice()}
                invoiceId={props.id}
                breadcrumbs={[
                  {
                    path: paths.editInvoice(props.id),
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
                  id={props.id}
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

const EditInvoicePage: Component = () => {
  const params = useParams();

  const id = () => safeParseOrNull(coerce(number(), Number), params.invoiceId);

  return (
    <Show when={id()} fallback={<Navigate href={paths.notFound} />}>
      {(id) => <EditInvoiceQuery id={id()} />}
    </Show>
  );
};

export default EditInvoicePage;
