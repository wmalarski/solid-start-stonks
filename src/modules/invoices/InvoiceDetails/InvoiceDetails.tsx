import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { useDateFormatter } from "~/components/utils/format";
import type { Invoice } from "~/db/invoices";
import {
  InvoiceCompany,
  InvoicePaymentMethod,
  InvoicePaymentSummary,
  InvoiceSummary,
  InvoiceTable,
} from "../InvoicePrimitives";

type Props = {
  invoice: Invoice;
};

export const InvoiceDetails: Component<Props> = (props) => {
  const [t] = useI18n();

  const dateFormatter = useDateFormatter();

  return (
    <div class="m-12 grid grid-cols-2 gap-x-16 gap-y-8">
      <span class="col-span-2 text-right text-sm">
        {t("invoice.header", {
          city: props.invoice.city,
          date: dateFormatter(props.invoice.date),
        })}
      </span>
      <InvoiceCompany
        title={t("invoice.seller")}
        address1={props.invoice.seller_address1}
        address2={props.invoice.seller_address2}
        name={props.invoice.seller_name}
        nip={props.invoice.seller_nip}
      />
      <InvoiceCompany
        title={t("invoice.buyer")}
        address1={props.invoice.buyer_address_1}
        address2={props.invoice.buyer_address_2}
        name={props.invoice.buyer_name}
        nip={props.invoice.buyer_nip}
      />
      <div class="col-span-2">
        <p class="m-1 text-center text-2xl font-extrabold">
          {t("invoice.title", { title: props.invoice.invoice_title })}
        </p>
        <div class="divider m-0" />
      </div>
      <div class="col-span-2 flex flex-row justify-center gap-x-20 text-sm">
        <InvoicePaymentMethod invoice={props.invoice} />
        <InvoicePaymentSummary invoice={props.invoice} />
      </div>
      <InvoiceTable class="col-span-2" invoice={props.invoice} />
      <InvoiceSummary invoice={props.invoice} />
      <div class="col-span-2">
        <p class="text-xs font-bold">{t("invoice.notes")}</p>
        <p class="w-full max-w-full text-sm">{props.invoice.notes}</p>
      </div>
    </div>
  );
};
