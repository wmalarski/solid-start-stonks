import { useI18n } from "@solid-primitives/i18n";
import { Component, createEffect } from "solid-js";
import { Navigate, RouteDataArgs, useRouteData } from "solid-start";
import {
  createServerAction$,
  createServerData$,
  redirect,
  ServerError,
} from "solid-start/server";
import { LoadingSwitch } from "~/components/LoadingSwitch/LoadingSwitch";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoiceTopbar } from "~/modules/InvoiceTopbar/InvoiceTopbar";
import {
  findInvoice,
  parseUpdateInvoiceForm,
  updateInvoice,
} from "~/server/invoices";
import { paths } from "~/utils/paths";

export const routeData = ({ params }: RouteDataArgs) => {
  return createServerData$((source) => findInvoice.fn(source), {
    key: () => findInvoice.key(params.invoiceId),
  });
};

const EditInvoicePage: Component = () => {
  const [t] = useI18n();

  const data = useRouteData<typeof routeData>();

  const [edit, submit] = createServerAction$(async (form: FormData) => {
    const id = form.get("id") as string;
    const parsed = await parseUpdateInvoiceForm(form);

    if (parsed.success) {
      updateInvoice(parsed.data);
      return redirect(paths.invoice(id));
    }

    throw new ServerError(JSON.stringify(parsed.error));

    // return json(parsed.error, { status: 200 });
  });

  // const [resource] = createResource(async () => await edit.input);

  createEffect(() => {
    const err = edit.error as ServerError;
    if (err) {
      const message = JSON.parse(err.message);
      console.log({ error: edit.error, message });
    }
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
          <pre>
            {JSON.stringify(
              {
                error: edit.error,
                input: edit.input,
                pending: edit.pending,
                result: edit.result?.json(),
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

export default EditInvoicePage;
