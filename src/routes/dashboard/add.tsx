import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { InvoiceForm } from "~/modules/invoices/InvoiceForm";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import { createInsertInvoiceServerAction } from "~/server/invoices";
import { getServerError } from "~/utils/errors";

const AddInvoicePage: Component = () => {
  const [t] = useI18n();

  const [add, submit] = createInsertInvoiceServerAction();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoicesTopbar />
      <h1 class="px-8 text-3xl font-semibold">{t("addInvoice.header")}</h1>
      <div class="p-8 pt-0">
        <InvoiceForm
          error={getServerError(add.error)}
          Form={submit.Form}
          isLoading={add.pending}
        />
      </div>
    </div>
  );
};

export default AddInvoicePage;
