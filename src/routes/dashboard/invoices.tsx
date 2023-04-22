import { useI18n } from "@solid-primitives/i18n";
import { createQuery } from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { Navigate, useNavigate, useSearchParams } from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Pagination } from "~/components/Pagination";
import { InvoicesList } from "~/modules/invoices/InvoicesList";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import { queryInvoices, selectInvoicesKey } from "~/server/invoices";
import { paths } from "~/utils/paths";

const limit = 10;

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const [searchParams] = useSearchParams();

  const page = () => +searchParams.page || 0;

  const invoicesQuery = createQuery(() => ({
    queryFn: (context) => queryInvoices(context.queryKey),
    queryKey: selectInvoicesKey({ limit, offset: page() * limit }),
  }));

  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoicesQuery.data}>
          {(invoices) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoicesTopbar />
              <div class="flex justify-between px-8">
                <h1 class="text-3xl font-semibold">{t("invoices.header")}</h1>
                <Pagination
                  current={page()}
                  max={Math.ceil(invoices().total / limit)}
                  onChange={(page) => navigate(paths.invoices(page))}
                />
              </div>
              <InvoicesList invoices={invoices().collection} />;
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default InvoicesPage;
