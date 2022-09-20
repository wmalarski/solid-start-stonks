import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoicesTopbar } from "~/modules/InvoicesTopbar/InvoicesTopbar";
import { paths } from "~/utils/paths";

const AddInvoicePage: Component = () => {
  const [t] = useI18n();

  const [add, submit] = createServerAction$(async (form: FormData, event) => {
    const id = form.get("id") as string;
    console.log({ event, id: form.get("id") });
    await Promise.resolve();
    return redirect(paths.invoice(id));
  });

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoicesTopbar />
      <h1 class="px-8 text-3xl font-semibold">{t("addInvoice.header")}</h1>
      <div class="p-8 pt-0">
        <InvoiceForm
          error={add.error as string}
          Form={submit.Form}
          isLoading={add.pending}
        />
      </div>
      <pre>
        {JSON.stringify(
          {
            error: add.error,
            input: add.input,
            pending: add.pending,
            result: add.result,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default AddInvoicePage;
