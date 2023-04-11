import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import { insertInvoice, invoiceSchema } from "~/db/invoices";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";
import { InvoicesTopbar } from "~/modules/InvoicesTopbar/InvoicesTopbar";
import { getUser } from "~/server/auth";
import { zodFormParse } from "~/server/utils";
import { paths } from "~/utils/paths";

const AddInvoicePage: Component = () => {
  const [t] = useI18n();

  const [add, submit] = createServerAction$(
    async (form: FormData, { request }) => {
      const user = await getUser(request);

      const parsed = await zodFormParse({ form, schema: invoiceSchema });
      const invoice = await insertInvoice({ ...parsed, user_id: user.id });

      return redirect(paths.invoice(invoice.insertId));
    }
  );

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
    </div>
  );
};

export default AddInvoicePage;
