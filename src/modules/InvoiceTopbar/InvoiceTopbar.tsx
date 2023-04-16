import { useI18n } from "@solid-primitives/i18n";
import { Component, For } from "solid-js";
import { A } from "solid-start";
import { buttonClass } from "~/components/Button";
import { Invoice } from "~/db/invoices";
import { paths } from "~/utils/paths";
import { DeleteInvoice } from "../DeleteInvoice/DeleteInvoice";

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
        text: props.invoice.invoice_title,
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
                <A href={path}>{text}</A>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div>
        <A
          href={paths.editInvoice(props.invoice.id)}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.editInvoice")}
        </A>
        <A
          href={paths.copyInvoice(props.invoice.id)}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.copyInvoice")}
        </A>
        <DeleteInvoice invoice={props.invoice} />
      </div>
    </div>
  );
};
