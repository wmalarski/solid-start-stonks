import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { selectInvoiceById } from "~/db/invoices";
import { InvoiceDetails } from "~/modules/InvoiceDetails/InvoiceDetails";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { getUser } from "~/server/auth";
import { selectInvoiceKey } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$(
    async ([, { id }], { request }) => {
      const user = await getUser(request);
      return selectInvoiceById({ id, userId: user.id });
    },
    { key: () => selectInvoiceKey({ id: params.invoiceId }) }
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
