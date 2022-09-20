import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { Invoices } from "~/modules/Invoices/Invoices";
import { InvoicesTopbar } from "~/modules/InvoicesTopbar/InvoicesTopbar";
import { findInvoices } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = (args: RouteDataArgs) => {
  const page = +args.location.query.page || 0;
  return createServerData$((source) => findInvoices.fn(source), {
    key: findInvoices.key({ limit: 10, skip: page * 10 }),
  });
};

const InvoicesPage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <LoadingSwitch
      resource={data}
      fallback={<Navigate href={paths.notFound} />}
    >
      {(invoices) => (
        <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
          <InvoicesTopbar />
          <h1 class="px-8 text-3xl font-semibold">{t("invoices.header")}</h1>
          <Invoices invoices={invoices} />;
        </div>
      )}
    </LoadingSwitch>
  );
};

export default InvoicesPage;
