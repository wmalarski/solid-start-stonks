import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import type { Invoice } from "~/server/types";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const InvoiceTopbar: Component<Props> = (props) => {
  const [t] = useI18n();

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={paths.invoices}>{t("topbar.home")}</Link>
          </li>
          <li>
            <Link href={paths.invoice(props.invoice.id)}>
              {props.invoice.invoiceTitle}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link
          href={paths.editInvoice(props.invoice.id)}
          class="btn btn-link btn-sm"
        >
          {t("topbar.editInvoice")}
        </Link>
        <Link
          href={paths.copyInvoice(props.invoice.id)}
          class="btn btn-link btn-sm"
        >
          {t("topbar.copyInvoice")}
        </Link>
        <button class="btn btn-warning btn-ghost btn-sm">
          {t("topbar.removeInvoice")}
        </button>
      </div>
    </div>
  );
};
