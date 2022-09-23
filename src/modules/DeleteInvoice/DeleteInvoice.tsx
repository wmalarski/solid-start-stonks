import type { Invoice } from "@prisma/client";
import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import { deleteInvoice } from "~/server/invoices";
import { withUserAction } from "~/server/session";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const DeleteInvoice: Component<Props> = (props) => {
  const [t] = useI18n();

  const [remove, submit] = createServerAction$(
    withUserAction(async (form: FormData, _, user) => {
      await deleteInvoice(form, user);
      return redirect(paths.invoices());
    })
  );

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
