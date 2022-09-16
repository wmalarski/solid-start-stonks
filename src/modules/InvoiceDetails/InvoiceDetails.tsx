import { useI18n } from "@solid-primitives/i18n";
import { JSX } from "solid-js";
import type { Invoice } from "~/server/types";

type Props = {
  invoice: Invoice;
};

export const InvoiceDetails = (props: Props): JSX.Element => {
  const [t, { locale }] = useI18n();

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale(), {
      currency: "PLN",
      style: "currency",
    }).format(value);
  };

  const numberFormatter = (value: number) => {
    return new Intl.NumberFormat(locale(), {
      minimumFractionDigits: 2,
    }).format(value);
  };

  const dateFormatter = (value: Date) => {
    return new Intl.DateTimeFormat(locale()).format(value);
  };

  const sum = () => {
    return props.invoice.serviceCount * props.invoice.servicePrice;
  };

  const dueDate = () => {
    const date = new Date(props.invoice.date);
    date.setDate(date.getDate() + 15);
    return date;
  };

  return (
    <div class="grid grid-cols-2 gap-x-16 gap-y-8 m-12 border-gray-400 w-full">
      <span class="text-right col-span-2 text-sm">
        {t("invoice.header", {
          city: props.invoice.city,
          date: dateFormatter(props.invoice.date),
        })}
      </span>
      <div>
        <p class="font-extrabold text-xl">{t("invoice.seller")}</p>
        <div class="divider m-0" />
        <p class="font-bold">{props.invoice.sellerName}</p>
        <p class="text-sm">{props.invoice.sellerAddress1}</p>
        <p class="text-sm">{props.invoice.sellerAddress2}</p>
        <p class="text-sm mt-2">
          {t("invoice.nip", { nip: props.invoice.sellerNip })}
        </p>
      </div>
      <div>
        <p class="font-extrabold text-xl">{t("invoice.buyer")}</p>
        <div class="divider m-0" />
        <p class="font-bold">{props.invoice.buyerName}</p>
        <p class="text-sm">{props.invoice.buyerAddress1}</p>
        <p class="text-sm">{props.invoice.buyerAddress2}</p>
        <p class="text-sm mt-2">
          {t("invoice.nip", { nip: props.invoice.buyerNip })}
        </p>
      </div>
      <div class="col-span-2">
        <p class="font-extrabold text-xl text-center m-1">
          {t("invoice.title", { title: props.invoice.invoiceTitle })}
        </p>
        <div class="divider m-0" />
      </div>
      <div class="col-span-2 flex flex-row gap-x-20 justify-center text-sm">
        <div class="flex flex-row gap-4 items-start">
          <p>{t("invoice.paymentMethod")}</p>
          <div class="grid grid-cols-[auto_1fr] text-sm gap-1">
            <input
              type="radio"
              class="radio radio-xs"
              checked={props.invoice.paymentMethod === "cash"}
              onChange={() => void 0}
            />
            <span>{t("invoice.cash")}</span>
            <input
              type="radio"
              class="radio radio-xs"
              checked={props.invoice.paymentMethod === "transfer"}
              onChange={() => void 0}
            />
            <span>{t("invoice.transfer")}</span>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td class="text-right">{t("invoice.dueDate")}</td>
              <td>{dateFormatter(dueDate())}</td>
            </tr>
            <tr>
              <td class="text-right">{t("invoice.bankName")}</td>
              <td>{props.invoice.paymentBank}</td>
            </tr>
            <tr>
              <td class="text-right">{t("invoice.account")}</td>
              <td>{props.invoice.paymentAccount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table class="text-sm col-span-2 table w-full">
        <thead>
          <tr>
            <th class="whitespace-normal w-3">{t("invoice.index")}</th>
            <th class="whitespace-normal">{t("invoice.serviceName")}</th>
            <th class="whitespace-normal w-3">{t("invoice.unit")}</th>
            <th class="whitespace-normal w-3">{t("invoice.count")}</th>
            <th class="whitespace-normal w-4">{t("invoice.price")}</th>
            <th class="whitespace-normal w-6">{t("invoice.sum")}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border text-xs">
            <td>1</td>
            <td>{props.invoice.serviceTitle}</td>
            <td>{props.invoice.serviceUnit}</td>
            <td>{props.invoice.serviceCount}</td>
            <td>{props.invoice.servicePrice}</td>
            <td>{numberFormatter(sum())}</td>
          </tr>
        </tbody>
      </table>
      <table class="col-span-2 text-xs">
        <tbody>
          <tr>
            <td>{t("invoice.toPay")}</td>
            <td class="text-right">{currencyFormatter(sum())}</td>
            <td class="w-6/12 pl-4">
              {t("invoice.longToPay", { sum: String(sum()) })}
            </td>
          </tr>
          <tr>
            <td>{t("invoice.payed")}</td>
            <td class="text-right">
              {currencyFormatter(props.invoice.servicePayed)}
            </td>
          </tr>
          <tr>
            <td>{t("invoice.leftToPay")}</td>
            <td class="text-right">
              {currencyFormatter(sum() - props.invoice.servicePayed)}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-span-2">
        <p class="text-xs font-bold">{t("invoice.notes")}</p>
        <p class="w-full max-w-full text-sm">{props.invoice.notes}</p>
      </div>
    </div>
  );
};
