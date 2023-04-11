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
import { getUser } from "~/server/auth";
import {
  FindInvoiceKey,
  findInvoice,
  parseAndUpdateInvoice,
} from "~/server/invoices";
import type { ResourceResult } from "~/server/types";
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

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [edit, submit] = createServerAction$(
    async (form: FormData, { request }) => {
      const user = await getUser(request);
      const invoice = await parseAndUpdateInvoice(form, user.id);
      return redirect(invoice ? paths.invoice(invoice.id) : paths.notFound);
    }
  );

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
                path: paths.editInvoice(invoice.id),
                text: t("topbar.editInvoice"),
              },
            ]}
          />
          <h1 class="px-8 text-3xl font-semibold">{t("editInvoice.header")}</h1>
          <div class="p-8 pt-0">
            <InvoiceForm
              error={edit.error as string}
              id={invoice.id}
              isLoading={edit.pending}
              Form={submit.Form}
              initial={invoice}
            />
          </div>
        </div>
      )}
    </LoadingSwitch>
  );
};

export default EditInvoicePage;
