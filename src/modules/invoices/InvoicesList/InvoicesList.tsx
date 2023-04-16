import { useI18n } from "@solid-primitives/i18n";
import { Component, For } from "solid-js";
import { A } from "solid-start";
import { buttonClass } from "~/components/Button";
import { useDateFormatter } from "~/components/utils/format";
import { Invoice } from "~/db/invoices";
import { DeleteInvoice } from "~/modules/invoices/DeleteInvoice";
import {
  InvoiceCompany,
  InvoiceSummary,
} from "~/modules/invoices/InvoiceDetails";
import { paths } from "~/utils/paths";

type InvoiceItemProps = {
  invoice: Invoice;
};

const InvoiceItem: Component<InvoiceItemProps> = (props) => {
  const [t] = useI18n();

  const dateFormatter = useDateFormatter();

  return (
    <div class="card w-full shadow-xl">
      <div class="card-body bg-base-100">
        <div class="flex justify-between">
          <h2 class="card-title text-2xl font-extrabold">
            {t("invoice.title", { title: props.invoice.invoice_title })}
          </h2>
          <span class="col-span-2 text-right text-sm">
            {t("invoice.header", {
              city: props.invoice.city,
              date: dateFormatter(props.invoice.date),
            })}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-x-16 gap-y-2">
          <InvoiceCompany
            address1={props.invoice.seller_address1}
            address2={props.invoice.seller_address2}
            name={props.invoice.seller_name}
            nip={props.invoice.seller_nip}
            title={t("invoice.seller")}
          />
          <InvoiceCompany
            address1={props.invoice.buyer_address_1}
            address2={props.invoice.buyer_address_2}
            name={props.invoice.buyer_name}
            nip={props.invoice.buyer_nip}
            title={t("invoice.buyer")}
          />
          <div class="divider col-span-2 m-0" />
          <InvoiceSummary class="col-span-2" invoice={props.invoice} />
        </div>
        <div class="card-actions">
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.invoice(props.invoice.id)}
          >
            {t("invoices.more")}
          </A>
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.editInvoice(props.invoice.id)}
          >
            {t("topbar.editInvoice")}
          </A>
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.copyInvoice(props.invoice.id)}
          >
            {t("topbar.copyInvoice")}
          </A>
          <DeleteInvoice invoice={props.invoice} />
        </div>
      </div>
    </div>
  );
};

type Props = {
  invoices: Invoice[];
};

export const InvoicesList: Component<Props> = (props) => {
  return (
    <div class="flex w-full flex-col gap-4 px-8">
      <For each={props.invoices}>
        {(invoice) => <InvoiceItem invoice={invoice} />}
      </For>
    </div>
  );
};
