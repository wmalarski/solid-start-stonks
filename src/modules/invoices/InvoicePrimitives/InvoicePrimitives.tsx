import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
  RadioGroupRoot,
} from "~/components/RadioGroup";
import {
  useCurrencyFormatter,
  useDateFormatter,
  useNumberFormatter,
} from "~/components/utils/format";
import { pricePLN } from "~/components/utils/pricePLN";
import { twCx } from "~/components/utils/twCva";
import type { Invoice } from "~/db/invoices";

type InvoiceCompanyProps = {
  address1: string;
  address2: string;
  name: string;
  nip: string;
  title: string;
};

export const InvoiceCompany: Component<InvoiceCompanyProps> = (props) => {
  const [t] = useI18n();

  return (
    <div>
      <p class="text-xl font-extrabold">{props.title}</p>
      <div class="divider m-0" />
      <p class="font-bold">{props.name}</p>
      <p class="text-sm">{props.address1}</p>
      <p class="text-sm">{props.address2}</p>
      <p class="mt-2 text-sm">{t("invoice.nip", { nip: props.nip })}</p>
    </div>
  );
};

type InvoiceSummaryProps = {
  class?: string;
  invoice: Invoice;
};

export const InvoiceSummary: Component<InvoiceSummaryProps> = (props) => {
  const [t] = useI18n();

  const currencyFormatter = useCurrencyFormatter();

  const sum = () => {
    return props.invoice.service_count * props.invoice.service_price;
  };

  return (
    <table class={twCx("text-xs", props.class)}>
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
  );
};

type InvoicePaymentProps = {
  invoice: Invoice;
};

export const InvoicePaymentMethod: Component<InvoicePaymentProps> = (props) => {
  const [t] = useI18n();

  return (
    <RadioGroupRoot
      class="flex flex-row items-start gap-4"
      value={props.invoice.payment_method}
    >
      <RadioGroupLabel>{t("invoice.paymentMethod")}</RadioGroupLabel>
      <div class="grid grid-cols-[auto_1fr] gap-1 text-sm">
        <RadioGroupItem value="cash">
          <RadioGroupItemInput />
          <RadioGroupItemControl>
            <RadioGroupItemIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemLabel>{t("invoice.cash")}</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem value="transfer">
          <RadioGroupItemInput />
          <RadioGroupItemControl>
            <RadioGroupItemIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemLabel>{t("invoice.transfer")}</RadioGroupItemLabel>
        </RadioGroupItem>
      </div>
    </RadioGroupRoot>
  );
};

type InvoiceTableProps = {
  class: string;
  invoice: Invoice;
};

export const InvoiceTable: Component<InvoiceTableProps> = (props) => {
  const [t] = useI18n();

  const numberFormatter = useNumberFormatter();

  const sum = () => {
    return props.invoice.service_count * props.invoice.service_price;
  };

  return (
    <table class={twCx("table w-full text-sm", props.class)}>
      <thead>
        <tr>
          <th class="w-3 whitespace-normal">{t("invoice.index")}</th>
          <th class="whitespace-normal">{t("invoice.serviceName")}</th>
          <th class="w-3 whitespace-normal">{t("invoice.unit")}</th>
          <th class="w-3 whitespace-normal">{t("invoice.count")}</th>
          <th class="w-4 whitespace-normal">{t("invoice.price")}</th>
          <th class="w-6 whitespace-normal">{t("invoice.sum")}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border text-xs">
          <td>1</td>
          <td class="whitespace-break-spaces">{props.invoice.service_title}</td>
          <td>{props.invoice.service_unit}</td>
          <td>{props.invoice.service_count}</td>
          <td>{props.invoice.service_price}</td>
          <td>{numberFormatter(sum())}</td>
        </tr>
      </tbody>
    </table>
  );
};

type InvoicePaymentSummaryProps = {
  invoice: Invoice;
};

export const InvoicePaymentSummary: Component<InvoicePaymentSummaryProps> = (
  props
) => {
  const [t] = useI18n();

  const dateFormatter = useDateFormatter();

  const dueDate = () => {
    const date = new Date(props.invoice.date);
    date.setDate(date.getDate() + 15);
    return date;
  };

  return (
    <table>
      <tbody>
        <tr>
          <td class="text-right">{t("invoice.dueDate")}</td>
          <td>{dateFormatter(dueDate())}</td>
        </tr>
        <tr>
          <td class="text-right">{t("invoice.bankName")}</td>
          <td>{props.invoice.payment_bank}</td>
        </tr>
        <tr>
          <td class="text-right">{t("invoice.account")}</td>
          <td>{props.invoice.payment_account}</td>
        </tr>
      </tbody>
    </table>
  );
};
