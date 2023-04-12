import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component } from "solid-js";
import { type Invoice } from "~/db/invoices";
import { createDeleteInvoiceServerAction } from "~/server/invoices";

type Props = {
  invoice: Invoice;
};

export const DeleteInvoice: Component<Props> = (props) => {
  const [t] = useI18n();

  const [remove, submit] = createDeleteInvoiceServerAction();

  return (
    <submit.Form>
      <input type="hidden" name="id" id="id" value={props.invoice.id} />
      <button
        type="submit"
        class={clsx("btn btn-warning btn-ghost btn-sm", {
          loading: remove.pending,
        })}
      >
        {t("topbar.removeInvoice")}
      </button>
    </submit.Form>
  );
};
