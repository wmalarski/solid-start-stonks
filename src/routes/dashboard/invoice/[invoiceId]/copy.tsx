import type { Invoice } from "@prisma/client";
import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { findInvoice, FindInvoiceKey, insertInvoice } from "~/server/invoices";
import { withUserData } from "~/server/session";
import type { ResourceResult } from "~/server/types";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$<ResourceResult<Invoice>, FindInvoiceKey>(
    withUserData((source, _, user) => findInvoice(source, user)),
    { key: () => ["findInvoice", params.invoiceId] }
  );
};

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [copy, submit] = createServerAction$(async (form: FormData) => {
    const invoice = await insertInvoice(form, "");
    return redirect(paths.invoice(invoice.id));
  });

  return (
    <LoadingSwitch
      resource={data}
      fallback={<Navigate href={paths.notFound} />}
    >
      {(invoice) => (
        <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
          <InvoiceTopbar
            invoice={invoice}
            breadcrumbs={[
              {
                path: paths.copyInvoice(invoice.id),
                text: t("topbar.copyInvoice"),
              },
            ]}
          />
          <h1 class="px-8 text-3xl font-semibold">{t("copyInvoice.header")}</h1>
          <div class="p-8 pt-0">
            <InvoiceForm
              error={copy.error as string}
              Form={submit.Form}
              initial={invoice}
              isLoading={copy.pending}
            />
          </div>
        </div>
      )}
    </LoadingSwitch>
  );
};

export default CopyInvoicePage;
