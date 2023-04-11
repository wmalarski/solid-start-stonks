import { useI18n } from "@solid-primitives/i18n";
import { Component, ErrorBoundary, Show, Suspense } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { z } from "zod";
import { LoadingSpinner } from "~/components/LoadingSpinner/LoadingSpinner";
import { invoiceSchema, updateInvoice } from "~/db/invoices";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import { getUser } from "~/server/auth";
import { createInvoiceServerData, selectInvoiceKey } from "~/server/invoices";
import { zodFormParse } from "~/server/utils";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createInvoiceServerData(() =>
    selectInvoiceKey({ id: params.invoiceId })
  );
};

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [edit, submit] = createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const idSchema = z.object({ id: z.string() });
    const schema = z.intersection(invoiceSchema.partial(), idSchema);

    const parsed = await zodFormParse({ form, schema });
    const invoice = await updateInvoice({
      change: parsed,
      id: parsed.id,
      userId: user.id,
    });

    return redirect(invoice ? paths.invoice(parsed.id) : paths.notFound);
  });

  return (
    <ErrorBoundary fallback={<Navigate href={paths.notFound} />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show when={data()}>
          {(invoice) => (
            <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
              <InvoiceTopbar
                invoice={invoice()}
                breadcrumbs={[
                  {
                    path: paths.editInvoice(invoice().id),
                    text: t("topbar.editInvoice"),
                  },
                ]}
              />
              <h1 class="px-8 text-3xl font-semibold">
                {t("editInvoice.header")}
              </h1>
              <div class="p-8 pt-0">
                <InvoiceForm
                  error={edit.error as string}
                  id={invoice().id}
                  isLoading={edit.pending}
                  Form={submit.Form}
                  initial={invoice()}
                />
              </div>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
};

export default EditInvoicePage;
