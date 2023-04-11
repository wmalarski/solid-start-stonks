import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import { z } from "zod";
import { deleteInvoice, type Invoice } from "~/db/invoices";
import { getUser } from "~/server/auth";
import { zodFormParse } from "~/server/utils";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const DeleteInvoice: Component<Props> = (props) => {
  const [t] = useI18n();

  const [remove, submit] = createServerAction$(
    async (form: FormData, { request }) => {
      const user = await getUser(request);

      const schema = z.object({ id: z.string() });
      const data = await zodFormParse({ form, schema });
      await deleteInvoice({ id: data.id, userId: user.id });

      return redirect(paths.invoices());
    }
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
