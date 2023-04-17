import { useI18n } from "@solid-primitives/i18n";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import {
  Navigate,
  useNavigate,
  useRouteData,
  type RouteDataArgs,
} from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Pagination } from "~/components/Pagination";
import { InvoicesList } from "~/modules/invoices/InvoicesList";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import { createInvoicesServerData, selectInvoicesKey } from "~/server/invoices";
import { paths } from "~/utils/paths";

const limit = 10;

export const routeData = (args: RouteDataArgs) => {
  const page = () => +args.location.query.page || 0;

  const invoices = createInvoicesServerData(() =>
    selectInvoicesKey({ limit, offset: page() * limit })
  );

  return { invoices, page };
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  // const query = createQuery({
  //   queryFn: () =>
  //     server$(() => {
  //       //
  //     })(),
  //   queryKey: () => ["invoices", { limit, page: 0 }],
  // });

  const data = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={data.invoices()}>
          {(invoices) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoicesTopbar />
              <div class="flex justify-between px-8">
                <h1 class="text-3xl font-semibold">{t("invoices.header")}</h1>
                <Pagination
                  current={data.page()}
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
