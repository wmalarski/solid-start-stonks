import { useI18n } from "@solid-primitives/i18n";
import {
  createInfiniteQuery,
  useQueryClient,
  type GetNextPageParamFunction,
} from "@tanstack/solid-query";
import { ErrorBoundary, Show, Suspense, type Component } from "solid-js";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { InvoicesList } from "~/modules/invoices/InvoicesList";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import {
  selectInvoiceKey,
  selectInvoicesKey,
  selectInvoicesServerQuery,
} from "~/server/invoices/actions";

const limit = 10;

const getNextPageParam: GetNextPageParamFunction<
  string | null,
  Awaited<ReturnType<typeof selectInvoicesServerQuery>>
> = (lastPage) => {
  if (!lastPage.next_cursor) {
    return;
  }
  return lastPage.next_cursor;
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const queryClient = useQueryClient();

  const invoicesQuery = createInfiniteQuery(() => ({
    getNextPageParam,
    initialPageParam: null,
    queryFn: async (context) => {
      const [, args] = context.queryKey;
      const startCursor = context.pageParam || undefined;
      const result = await selectInvoicesServerQuery(
        selectInvoicesKey({ ...args, startCursor }),
      );

      result.results.forEach((invoice) => {
        if (invoice.id) {
          queryClient.setQueryData(
            selectInvoiceKey({ id: invoice.id }),
            invoice,
          );
        }
      });

      return result;
    },
    queryKey: selectInvoicesKey({ pageSize: limit }),
    suspense: true,
  }));

  return (
    <ErrorBoundary fallback={(e) => <pre>{JSON.stringify(e, null, 2)}</pre>}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={invoicesQuery.data}>
          {(invoices) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoicesTopbar />
              <div class="flex justify-between px-8">
                <h1 class="text-3xl font-semibold">{t("invoices.header")}</h1>
              </div>
              <InvoicesList
                hasNextPage={invoicesQuery.hasNextPage}
                invoices={invoices().pages.flatMap((page) => page.results)}
                isFetching={invoicesQuery.isFetchingNextPage}
                onFetchNextPage={invoicesQuery.fetchNextPage}
              />
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default InvoicesPage;
