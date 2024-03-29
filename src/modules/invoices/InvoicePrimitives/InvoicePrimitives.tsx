import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { Divider } from "~/components/Divider";
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
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "~/components/Table";
import {
  useCurrencyFormatter,
  useDateFormatter,
  useNumberFormatter,
} from "~/components/utils/format";
import { pricePLN } from "~/components/utils/pricePLN";
import { twCx } from "~/components/utils/twCva";
import type { Invoice } from "~/server/invoices/api";

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
      <Divider />
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
    return props.invoice.serviceCount * props.invoice.servicePrice;
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
      value={props.invoice.paymentMethod}
    >
      <RadioGroupLabel>{t("invoice.paymentMethod")}</RadioGroupLabel>
      <div class="flex flex-col gap-1">
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
    return props.invoice.serviceCount * props.invoice.servicePrice;
  };

  return (
    <Table class={twCx("w-full", props.class)}>
      <TableHead>
        <TableRow>
          <TableHeaderCell class="w-3 whitespace-normal">
            {t("invoice.index")}
          </TableHeaderCell>
          <TableHeaderCell class="whitespace-normal">
            {t("invoice.serviceName")}
          </TableHeaderCell>
          <TableHeaderCell class="w-3 whitespace-normal">
            {t("invoice.unit")}
          </TableHeaderCell>
          <TableHeaderCell class="w-3 whitespace-normal">
            {t("invoice.count")}
          </TableHeaderCell>
          <TableHeaderCell class="w-4 whitespace-normal">
            {t("invoice.price")}
          </TableHeaderCell>
          <TableHeaderCell class="w-6 whitespace-normal">
            {t("invoice.sum")}
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow class="border text-xs">
          <TableDataCell>1</TableDataCell>
          <TableDataCell class="whitespace-break-spaces">
            {props.invoice.serviceTitle}
          </TableDataCell>
          <TableDataCell>{props.invoice.serviceUnit}</TableDataCell>
          <TableDataCell>{props.invoice.serviceCount}</TableDataCell>
          <TableDataCell>{props.invoice.servicePrice}</TableDataCell>
          <TableDataCell>{numberFormatter(sum())}</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

type InvoicePaymentSummaryProps = {
  invoice: Invoice;
};

export const InvoicePaymentSummary: Component<InvoicePaymentSummaryProps> = (
  props,
) => {
  const [t] = useI18n();

  const dateFormatter = useDateFormatter();

  const dueDate = () => {
    const date = new Date(props.invoice.date);
    date.setDate(date.getDate() + 15);
    return date;
  };

  return (
    <table class="text-sm">
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
  );
};
