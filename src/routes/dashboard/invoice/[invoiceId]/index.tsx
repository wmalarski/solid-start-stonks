import type { Invoice } from "@prisma/client";
import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { InvoiceDetails } from "~/modules/InvoiceDetails/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { getUser } from "~/server/auth";
import { findInvoice, FindInvoiceKey } from "~/server/invoices";
import { ResourceResult } from "~/server/types";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$<ResourceResult<Invoice>, FindInvoiceKey>(
    async (source, { request }) => {
      const user = await getUser(request);
      return findInvoice(source, user.id);
    },
    { key: () => ["findInvoice", params.invoiceId] }
  );
};

const InvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  return (
    <LoadingSwitch
      resource={data}
      fallback={<Navigate href={paths.notFound} />}
    >
      {(invoice) => (
        <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
          <InvoiceTopbar invoice={invoice} />
          <h1 class="px-8 text-3xl font-semibold print:invisible print:hidden">
            {t("invoice.title", { title: invoice.invoiceTitle })}
          </h1>
          <div class="[@media_not_print]:card [@media_not_print]:card-compact [@media_not_print]:m-8 [@media_not_print]:mt-0 [@media_not_print]:shadow-xl">
            <div class="[@media_not_print]:card-body [@media_not_print]:p-0">
              <InvoiceDetails invoice={invoice} />
            </div>
          </div>
        </div>
      )}
    </LoadingSwitch>
  );
};

export default InvoicePage;
