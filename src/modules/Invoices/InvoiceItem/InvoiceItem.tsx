import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { Invoice } from "~/db/invoices";
import { DeleteInvoice } from "~/modules/DeleteInvoice/DeleteInvoice";
import { paths } from "~/utils/paths";
import { pricePLN } from "~/utils/pricePLN";

type Props = {
  invoice: Invoice;
};

export const InvoiceItem: Component<Props> = (props) => {
  const [t, { locale }] = useI18n();

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale(), {
      currency: "PLN",
      style: "currency",
    }).format(value);
  };

  const dateFormatter = (value: Date | string) => {
    return new Intl.DateTimeFormat(locale()).format(new Date(value));
  };

  const sum = () => {
    return props.invoice.service_count * props.invoice.service_price;
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
          <div>
            <p class="text-xl font-extrabold">{t("invoice.seller")}</p>
            <div class="divider m-0" />
            <p class="font-bold">{props.invoice.seller_name}</p>
            <p class="text-sm">{props.invoice.seller_address1}</p>
            <p class="text-sm">{props.invoice.seller_address2}</p>
            <p class="mt-2 text-sm">
              {t("invoice.nip", { nip: props.invoice.seller_nip })}
            </p>
          </div>
          <div>
            <p class="text-xl font-extrabold">{t("invoice.buyer")}</p>
            <div class="divider m-0" />
            <p class="font-bold">{props.invoice.buyer_name}</p>
            <p class="text-sm">{props.invoice.buyer_address_1}</p>
            <p class="text-sm">{props.invoice.buyer_address_2}</p>
            <p class="mt-2 text-sm">
              {t("invoice.nip", { nip: props.invoice.buyer_nip })}
            </p>
          </div>
          <div class="divider col-span-2 m-0" />
          <table class="col-span-2 text-xs">
            <tbody>
              <tr>
                <td>{t("invoice.toPay")}</td>
                <td class="text-right">{currencyFormatter(sum())}</td>
                <td class="w-6/12 pl-4">
                  {t("invoice.longToPay", { sum: pricePLN(sum()) })}
                </td>
              </tr>
              <tr>
                <td>{t("invoice.payed")}</td>
                <td class="text-right">
                  {currencyFormatter(props.invoice.service_payed)}
                </td>
              </tr>
              <tr>
                <td>{t("invoice.leftToPay")}</td>
                <td class="text-right">
                  {currencyFormatter(sum() - props.invoice.service_payed)}
                </td>
              </tr>
            </tbody>
          </table>
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
