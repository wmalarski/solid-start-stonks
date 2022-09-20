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
import { findInvoice } from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$((source) => findInvoice.fn(source), {
    key: () => findInvoice.key(params.invoiceId),
  });
};

const CopyInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [copy, submit] = createServerAction$(async (form: FormData, event) => {
    const id = form.get("id") as string;
    console.log({ event, id: form.get("id") });
    await Promise.resolve();
    return redirect(paths.invoice(id));
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
              error=""
              Form={submit.Form}
              initial={invoice}
              isLoading={false}
            />
          </div>
          <pre>
            {JSON.stringify(
              {
                error: copy.error,
                input: copy.input,
                pending: copy.pending,
                result: copy.result,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </LoadingSwitch>
  );
};

export default CopyInvoicePage;
