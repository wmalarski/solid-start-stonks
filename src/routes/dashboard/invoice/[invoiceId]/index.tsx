import { useI18n } from "@solid-primitives/i18n";
import { createQuery } from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useParams } from "solid-start";
import { coerce, number } from "valibot";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoiceDetails } from "~/modules/invoices/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/invoices/InvoiceTopbar";
import {
  selectInvoiceKey,
  selectInvoiceServerQuery,
} from "~/server/invoices/actions";
import { paths } from "~/utils/paths";
import { safeParseOrNull } from "~/utils/validation";

type InvoiceQueryProps = {
  id: number;
};

const InvoiceQuery: Component<InvoiceQueryProps> = (props) => {
  const [t] = useI18n();

  const invoiceQuery = createQuery(() => ({
    queryFn: (context) => selectInvoiceServerQuery(context.queryKey),
    queryKey: selectInvoiceKey({ id: props.id }),
    suspense: true,
  }));

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoiceQuery.data}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar invoice={invoice()} invoiceId={props.id} />
              <h1 class="px-8 text-3xl font-semibold print:invisible print:hidden">
                {t("invoice.title", { title: invoice().invoiceTitle })}
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

const InvoicePage: Component = () => {
  const params = useParams();

  const id = () => safeParseOrNull(coerce(number(), Number), params.invoiceId);

  return (
    <Show when={id()} fallback={<Navigate href={paths.notFound} />}>
      {(id) => <InvoiceQuery id={id()} />}
    </Show>
  );
};

export default InvoicePage;
