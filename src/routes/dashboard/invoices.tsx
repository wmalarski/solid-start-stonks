import { useI18n } from "@solid-primitives/i18n";
import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import {
  Navigate,
  useNavigate,
  useRouteData,
  useSearchParams,
  type RouteDataArgs,
} from "solid-start";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Pagination } from "~/components/Pagination";
import { InvoicesList } from "~/modules/invoices/InvoicesList";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import {
  selectInvoiceKey,
  selectInvoicesKey,
  selectInvoicesServerQuery,
} from "~/server/invoices";
import { paths } from "~/utils/paths";

const limit = 10;

// export const routeData = () => {
//   return createServerData$(async (_source, { request }) => {
//     console.log("Index", Boolean(request));

//     const session = await getSession(request);

//     if (!session) {
//       return redirect(paths.login);
//     }
//     return redirect(paths.invoices());
//   });
// };

// export const createInvoiceServerData = (
//   key: () => ReturnType<typeof selectInvoiceKey>
// ) => {
//   return createServerData$(
//     async ([, { id }], event) => {
//       const user = await getUser(event.request);

//       const invoice = await selectInvoiceById({ id, userId: user.id });

//       if (!invoice) {
//         throw redirect(paths.notFound);
//       }

//       return invoice;
//     },
//     { key }
//   );
// };

export const routeData = (args: RouteDataArgs) => {
  const page = () => +args.location.query.page || 0;

  // const invoices = createInvoicesServerData(() =>
  //   selectInvoicesKey({ limit, offset: page() * limit })
  // );

  const queryClient = useQueryClient();

  return createQuery(() => ({
    queryFn: async (context) => {
      const result = await selectInvoicesServerQuery(context.queryKey);

      result.collection.forEach((invoice) => {
        queryClient.setQueryData(selectInvoiceKey({ id: invoice.id }), invoice);
      });

      return result;
    },
    queryKey: selectInvoicesKey({ limit, offset: page() * limit }),
    suspense: true,
  }));
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const [searchParams] = useSearchParams();
  const page = () => +searchParams.page || 0;

  const invoicesQuery = useRouteData<typeof routeData>();

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
              {/* <pre>{JSON.stringify(invoices().collection, null, 2)}</pre> */}
              <InvoicesList invoices={invoices().collection} />;
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default InvoicesPage;
