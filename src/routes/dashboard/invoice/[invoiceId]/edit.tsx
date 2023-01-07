import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { getUser } from "~/server/auth";
import { createInvoiceData$, updateInvoice } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createInvoiceData$(() => ["findInvoice", params.invoiceId]);
};

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [edit, submit] = createServerAction$(
    async (form: FormData, { request }) => {
      const user = await getUser(request);
      const invoice = await updateInvoice(form, user.id);
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
