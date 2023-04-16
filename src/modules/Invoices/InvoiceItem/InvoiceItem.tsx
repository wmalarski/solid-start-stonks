import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { Invoice } from "~/db/invoices";
import { DeleteInvoice } from "~/modules/DeleteInvoice/DeleteInvoice";
import {
  InvoiceCompany,
  InvoiceSummary,
} from "~/modules/InvoiceDetails/InvoiceDetails";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const InvoiceItem: Component<Props> = (props) => {
  const [t, { locale }] = useI18n();

  const dateFormatter = (value: Date | string) => {
    return new Intl.DateTimeFormat(locale()).format(new Date(value));
  };

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
          <div class="divider col-span-2 m-0" />
          <InvoiceSummary class="col-span-2" invoice={props.invoice} />
        </div>
        <div class="card-actions">
          <Link
            href={paths.invoice(props.invoice.id)}
            class="btn btn-link btn-sm"
          >
            {t("invoices.more")}
          </Link>
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
          <DeleteInvoice invoice={props.invoice} />
        </div>
      </div>
    </div>
  );
};
