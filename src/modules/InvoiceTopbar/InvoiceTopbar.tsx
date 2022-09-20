import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component, For } from "solid-js";
import type { Invoice } from "~/server/types";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
  breadcrumbs?: { path: string; text: string }[];
};

export const InvoiceTopbar: Component<Props> = (props) => {
  const [t] = useI18n();

  const breadcrumbs = () => {
    return [
      { path: paths.invoices(), text: t("topbar.home") },
      {
        path: paths.invoice(props.invoice.id),
        text: props.invoice.invoiceTitle,
      },
      ...(props.breadcrumbs || []),
    ];
  };

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <div class="breadcrumbs text-sm">
        <ul>
          <For each={breadcrumbs()}>
            {({ path, text }) => (
              <li>
                <Link href={path}>{text}</Link>
              </li>
            )}
          </For>
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
