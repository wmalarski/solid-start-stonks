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
    <div class="navbar flex w-full px-8 print:invisible print:hidden">
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
      <div class="">
        <button class="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
