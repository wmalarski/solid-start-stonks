import { useI18n } from "@solid-primitives/i18n";
import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { Pagination } from "~/components/Pagination/Pagination";
import { Invoices } from "~/modules/Invoices/Invoices";
import { InvoicesTopbar } from "~/modules/InvoicesTopbar/InvoicesTopbar";
import {
  findInvoices,
  FindInvoicesKey,
  FindInvoicesResult,
} from "~/server/invoices";
import type { ResourceResult } from "~/server/types";
import { paths } from "~/utils/paths";

const limit = 10;

export const routeData = (args: RouteDataArgs) => {
  const page = () => +args.location.query.page || 0;
  const invoices = createServerData$<
    ResourceResult<FindInvoicesResult>,
    FindInvoicesKey
  >((source) => findInvoices(source), {
    key: () => ["findInvoices", { limit, skip: page() * limit }],
  });
  return { invoices, page };
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  return (
    <LoadingSwitch
      resource={data.invoices}
      fallback={<Navigate href={paths.notFound} />}
    >
      {(result) => (
        <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
          <InvoicesTopbar />
          <div class="flex justify-between px-8">
            <h1 class="text-3xl font-semibold">{t("invoices.header")}</h1>
            <Pagination
              current={data.page()}
              max={Math.ceil(result.size / limit)}
              onChange={(page) => navigate(paths.invoices(page))}
            />
          </div>
          <Invoices invoices={result.invoices} />;
        </div>
      )}
    </LoadingSwitch>
  );
};

export default InvoicesPage;
