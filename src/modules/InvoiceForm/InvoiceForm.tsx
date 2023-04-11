/* eslint-disable jsx-a11y/label-has-associated-control */
import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import {
  Component,
  createEffect,
  createSignal,
  ParentComponent,
  Show,
} from "solid-js";
import { FormProps } from "solid-start";
import { DatePicker } from "~/components/DatePicker/DatePicker";
import { Invoice } from "~/db/invoices";

export type InvoiceFormData = Omit<Invoice, "id">;

const formDefault: InvoiceFormData = {
  buyer_address_1: "",
  buyer_address_2: "",
  buyer_name: "",
  buyer_nip: "",
  city: "",
  created_at: new Date(),
  date: new Date(),
  invoice_title: "",
  notes: "",
  payment_account: "",
  payment_bank: "",
  payment_method: "transfer",
  seller_address1: "",
  seller_address2: "",
  seller_name: "",
  seller_nip: "",
  service_count: 0,
  service_payed: 0,
  service_price: 0,
  service_title: "",
  service_unit: "",
  updated_at: new Date(),
  user_id: "",
};

type Props = {
  error: string;
  Form: ParentComponent<FormProps>;
  id?: string;
  initial?: InvoiceFormData;
  isLoading: boolean;
};

export const InvoiceForm: Component<Props> = (props) => {
  const [t] = useI18n();

  const [date, setDate] = createSignal(new Date(formDefault.date));

  const initial = () => {
    return { ...formDefault, ...props.initial };
  };

  createEffect(() => {
    setDate(new Date(initial().date));
  });

  return (
    <div class="card shadow-xl">
      <props.Form class="card-body grid w-full grid-cols-[auto_1fr] gap-2">
        <Show when={props.id} keyed>
          {(id) => <input id="id" name="id" type="hidden" value={id} />}
        </Show>
        <input
          id="date"
          name="date"
          type="hidden"
          value={date().toISOString()}
        />
        <input
          id="paymentMethod"
          name="paymentMethod"
          type="hidden"
          value={initial().payment_method}
        />
        <input
          id="servicePayed"
          name="servicePayed"
          type="hidden"
          value={initial().service_payed}
        />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.general")}</h3>
        <label for="city" class="label label-text font-semibold">
          {t("invoiceForm.city")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="city"
            name="city"
            placeholder={t("invoiceForm.city")}
            type="text"
            value={initial().city}
          />
        </div>
        <label for="date" class="label label-text font-semibold">
          {t("invoiceForm.date")}
        </label>
        <div class="flex w-full flex-col gap-2">
          <DatePicker
            disabled={props.isLoading}
            id="date"
            value={date()}
            onChange={(change) => setDate(change)}
          />
        </div>
        <label for="invoiceTitle" class="label label-text font-semibold">
          {t("invoiceForm.invoiceTitle")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="invoiceTitle"
            name="invoiceTitle"
            placeholder={t("invoiceForm.invoiceTitle")}
            type="text"
            value={initial().invoice_title}
          />
        </div>
        <div class="divider col-span-2 m-0" />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.seller")}</h3>
        <label for="sellerAddress1" class="label label-text font-semibold">
          {t("invoiceForm.sellerAddress1")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="sellerAddress1"
            name="sellerAddress1"
            placeholder={t("invoiceForm.sellerAddress1")}
            type="text"
            value={initial().seller_address1}
          />
        </div>
        <label for="sellerAddress2" class="label label-text font-semibold">
          {t("invoiceForm.sellerAddress2")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="sellerAddress2"
            name="sellerAddress2"
            placeholder={t("invoiceForm.sellerAddress2")}
            type="text"
            value={initial().seller_address2}
          />
        </div>
        <label for="sellerName" class="label label-text font-semibold">
          {t("invoiceForm.sellerName")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="sellerName"
            name="sellerName"
            placeholder={t("invoiceForm.sellerName")}
            type="text"
            value={initial().seller_name}
          />
        </div>
        <label for="sellerNip" class="label label-text font-semibold">
          {t("invoiceForm.sellerNip")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="sellerNip"
            name="sellerNip"
            placeholder={t("invoiceForm.sellerNip")}
            type="text"
            value={initial().seller_nip}
          />
        </div>
        <div class="divider col-span-2 m-0" />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.buyer")}</h3>
        <label for="buyerAddress1" class="label label-text font-semibold">
          {t("invoiceForm.buyerAddress1")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="buyerAddress1"
            name="buyerAddress1"
            placeholder={t("invoiceForm.buyerAddress1")}
            type="text"
            value={initial().buyer_address_1}
          />
        </div>
        <label for="buyerAddress2" class="label label-text font-semibold">
          {t("invoiceForm.buyerAddress2")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="buyerAddress2"
            name="buyerAddress2"
            placeholder={t("invoiceForm.buyerAddress2")}
            type="text"
            value={initial().buyer_address_2}
          />
        </div>
        <label for="buyerName" class="label label-text font-semibold">
          {t("invoiceForm.buyerName")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="buyerName"
            name="buyerName"
            placeholder={t("invoiceForm.buyerName")}
            type="text"
            value={initial().buyer_name}
          />
        </div>
        <label for="buyerNip" class="label label-text font-semibold">
          {t("invoiceForm.buyerNip")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="buyerNip"
            name="buyerNip"
            placeholder={t("invoiceForm.buyerNip")}
            type="text"
            value={initial().buyer_nip}
          />
        </div>
        <div class="divider col-span-2 m-0" />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.payment")}</h3>
        <label for="paymentAccount" class="label label-text font-semibold">
          {t("invoiceForm.paymentAccount")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="paymentAccount"
            name="paymentAccount"
            placeholder={t("invoiceForm.paymentAccount")}
            type="text"
            value={initial().payment_account}
          />
        </div>
        <label for="paymentBank" class="label label-text font-semibold">
          {t("invoiceForm.paymentBank")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="paymentBank"
            name="paymentBank"
            placeholder={t("invoiceForm.paymentBank")}
            type="text"
            value={initial().payment_bank}
          />
        </div>
        <div class="divider col-span-2 m-0" />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.service")}</h3>
        <label for="serviceCount" class="label label-text font-semibold">
          {t("invoiceForm.serviceCount")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="serviceCount"
            name="serviceCount"
            placeholder={t("invoiceForm.serviceCount")}
            type="number"
            min={0}
            step={1}
            value={initial().service_count}
          />
        </div>
        <label for="servicePrice" class="label label-text font-semibold">
          {t("invoiceForm.servicePrice")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="servicePrice"
            name="servicePrice"
            placeholder={t("invoiceForm.servicePrice")}
            type="number"
            min={0}
            step={1}
            value={initial().service_price}
          />
        </div>
        <label for="serviceTitle" class="label label-text font-semibold">
          {t("invoiceForm.serviceTitle")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="serviceTitle"
            name="serviceTitle"
            placeholder={t("invoiceForm.serviceTitle")}
            type="text"
            value={initial().service_title}
          />
        </div>
        <label for="serviceUnit" class="label label-text font-semibold">
          {t("invoiceForm.serviceUnit")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="serviceUnit"
            name="serviceUnit"
            placeholder={t("invoiceForm.serviceUnit")}
            type="text"
            value={initial().service_unit}
          />
        </div>
        <div class="divider col-span-2 m-0" />
        <h3 class="col-span-2 text-xl">{t("invoiceForm.notes")}</h3>
        <label for="notes" class="label label-text font-semibold">
          {t("invoiceForm.notes")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="notes"
            name="notes"
            placeholder={t("invoiceForm.notes")}
            type="text"
            value={initial().notes}
          />
        </div>
        <Show when={props.error} keyed>
          {(error) => <div class="text-sm text-red-400">{error}</div>}
        </Show>
        <div class="col-span-2 flex w-full justify-end gap-2">
          <button
            disabled={props.isLoading}
            class={clsx("btn btn-primary", { loading: props.isLoading })}
            type="submit"
          >
            {t("invoiceForm.save")}
          </button>
        </div>
      </props.Form>
    </div>
  );
};
