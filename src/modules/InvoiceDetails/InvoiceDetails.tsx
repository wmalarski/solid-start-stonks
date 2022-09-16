import { JSX } from "solid-js";
import type { Invoice } from "~/server/types";

type Props = {
  invoice: Invoice;
};

export const InvoiceDetails = (props: Props): JSX.Element => {
  const locale = "pl";

  const sum = () => {
    return props.invoice.serviceCount * props.invoice.servicePrice;
  };

  const currencyFormatter = new Intl.NumberFormat(locale, {
    currency: "PLN",
    style: "currency",
  });

  const dateFormatter = new Intl.DateTimeFormat(locale);

  return (
    <div class="grid grid-cols-2 gap-x-16 gap-y-8 m-12 border-gray-400 w-full">
      <span class="text-right col-span-2 text-sm">
        {`${props.invoice.city}, dnia: ${dateFormatter.format(
          props.invoice.date
        )}`}
      </span>
      <div>
        <p class="font-extrabold text-xl">Sprzedawca</p>
        <div class="divider m-0" />
        <p class="font-bold">{props.invoice.sellerName}</p>
        <p class="text-sm">{props.invoice.sellerAddress1}</p>
        <p class="text-sm">{props.invoice.sellerAddress2}</p>
        <p class="text-sm mt-2">{`NIP: ${props.invoice.sellerNip}`}</p>
      </div>
      <div>
        <p class="font-extrabold text-xl">Nabywca</p>
        <div class="divider m-0" />
        <p class="font-bold">{props.invoice.buyerName}</p>
        <p class="text-sm">{props.invoice.buyerAddress1}</p>
        <p class="text-sm">{props.invoice.buyerAddress2}</p>
        <p class="text-sm mt-2">{`NIP: ${props.invoice.buyerNip}`}</p>
      </div>
      <div class="col-span-2">
        <p class="font-extrabold text-xl text-center m-1">
          {`FAKTURA Nr ${props.invoice.invoiceTitle}`}
        </p>
        <div class="divider m-0" />
      </div>
      <div class="col-span-2 flex flex-row gap-x-20 justify-center text-sm">
        <div class="flex flex-row gap-4 items-start">
          <p>Sposób płatności:</p>
          <div class="grid grid-cols-[auto_1fr] text-sm gap-1">
            <input
              type="radio"
              class="radio radio-xs"
              checked={props.invoice.paymentMethod === "cash"}
              onChange={() => void 0}
            />
            <span>Gotówka</span>
            <input
              type="radio"
              class="radio radio-xs"
              checked={props.invoice.paymentMethod === "transfer"}
              onChange={() => void 0}
            />
            <span>Przelew</span>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td class="text-right">Termin płatności:</td>
              <td>{dateFormatter.format(props.invoice.paymentDueDate)}</td>
            </tr>
            <tr>
              <td class="text-right">Nazwa Banku:</td>
              <td>{props.invoice.paymentBank}</td>
            </tr>
            <tr>
              <td class="text-right">Nr konta:</td>
              <td>{props.invoice.paymentAccount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table class="text-sm col-span-2 table w-full">
        <thead>
          <tr class="">
            <th class="w-3">Lp.</th>
            <th>Nazwa towaru lub usługi</th>
            <th class="w-3">JM</th>
            <th class="w-3">Ilość</th>
            <th class="w-3">Cena jednostkowa PLN</th>
            <th class="w-3">Wartość towaru (usługi) PLN</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border text-xs">
            <td>1</td>
            <td>{props.invoice.serviceTitle}</td>
            <td>{props.invoice.serviceUnit}</td>
            <td>{props.invoice.serviceCount}</td>
            <td>{props.invoice.servicePrice}</td>
            <td>
              {new Intl.NumberFormat(locale, {
                minimumFractionDigits: 2,
              }).format(sum())}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="col-span-2 text-xs">
        <tbody>
          <tr>
            <td>Do zapłaty:</td>
            <td class="text-right">{currencyFormatter.format(sum())}</td>
            <td class="w-6/12 pl-4">{`(słownie: ${sum()} 00/100)`}</td>
          </tr>
          <tr>
            <td>Zapłacono:</td>
            <td class="text-right">
              {currencyFormatter.format(props.invoice.servicePayed)}
            </td>
          </tr>
          <tr>
            <td>Pozostało do zapłaty:</td>
            <td class="text-right">
              {currencyFormatter.format(sum() - props.invoice.servicePayed)}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-span-2">
        <p class="text-xs font-bold">Uwagi:</p>
        <p class="w-full max-w-full text-sm">{props.invoice.notes}</p>
      </div>
    </div>
  );
};
