import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { Button } from "~/components/Button";
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
      <Button
        color="warning"
        disabled={remove.pending}
        isLoading={remove.pending}
        size="sm"
        type="submit"
        variant="ghost"
      >
        {t("topbar.removeInvoice")}
      </Button>
    </submit.Form>
  );
};
