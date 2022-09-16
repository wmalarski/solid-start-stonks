import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { JSX } from "solid-js";
import type { Invoice } from "~/server/types";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const InvoiceItem = (props: Props): JSX.Element => {
  const [t] = useI18n();

  return (
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{props.invoice.invoiceTitle}</h2>
        <pre>{JSON.stringify(props.invoice, null, 2)}</pre>
        <div class="card-actions">
          <Link href={paths.invoice(props.invoice.id)} class="btn btn-link">
            {t("invoices.more")}
          </Link>
        </div>
      </div>
    </div>
  );
};
