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
import { Invoice } from "~/server/types";

export type InvoiceFormData = Omit<Invoice, "id">;

const formDefault: InvoiceFormData = {
  buyerAddress1: "",
  buyerAddress2: "",
  buyerName: "",
  buyerNip: "",
  city: "",
  date: new Date().toISOString(),
  invoiceTitle: "",
  notes: "",
  paymentAccount: "",
  paymentBank: "",
  paymentMethod: "transfer",
  sellerAddress1: "",
  sellerAddress2: "",
  sellerName: "",
  sellerNip: "",
  serviceCount: 0,
  servicePayed: 0,
  servicePrice: 0,
  serviceTitle: "",
  serviceUnit: "",
};

type Props = {
  error: string;
  Form: ParentComponent<FormProps>;
  initial?: InvoiceFormData;
  isLoading: boolean;
  onSubmit: (args: InvoiceFormData) => void;
};

export const InvoiceForm: Component<Props> = (props) => {
  const [t] = useI18n();

  const [input, setInput] = createSignal<InvoiceFormData>(formDefault);

  const handleSubmit = () => {
    props.onSubmit(input());
  };

  createEffect(() => {
    if (!props.initial) {
      return;
    }
    setInput(props.initial);
  });

  const handleChange = (update: Partial<InvoiceFormData> = {}) => {
    setInput((current) => ({ ...current, ...update }));
  };

  return (
    <div class="card shadow-xl">
      <props.Form class="card-body grid w-full grid-cols-[auto_1fr] gap-2">
        <h3 class="col-span-2 text-xl">{t("invoiceForm.general")}</h3>
        <label for="city" class="label label-text font-semibold">
          {t("invoiceForm.city")}
        </label>
        <div class="flex w-full gap-2">
          <input
            class="input input-bordered input-sm grow"
            disabled={props.isLoading}
            id="city"
            onChange={(event) =>
              handleChange({ city: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.city")}
            type="text"
            value={input().city}
          />
        </div>
        <label for="date" class="label label-text font-semibold">
          {t("invoiceForm.date")}
        </label>
        <div class="flex w-full flex-col gap-2">
          <DatePicker
            disabled={props.isLoading}
            id="date"
            value={new Date(input().date)}
            onChange={(date) => handleChange({ date: date.toISOString() })}
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
            onChange={(event) =>
              handleChange({ invoiceTitle: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.invoiceTitle")}
            type="text"
            value={input().invoiceTitle}
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
            onChange={(event) =>
              handleChange({ sellerAddress1: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.sellerAddress1")}
            type="text"
            value={input().sellerAddress1}
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
            onChange={(event) =>
              handleChange({ sellerAddress2: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.sellerAddress2")}
            type="text"
            value={input().sellerAddress2}
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
            onChange={(event) =>
              handleChange({ sellerName: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.sellerName")}
            type="text"
            value={input().sellerName}
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
            onChange={(event) =>
              handleChange({ sellerNip: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.sellerNip")}
            type="text"
            value={input().sellerNip}
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
            onChange={(event) =>
              handleChange({ buyerAddress1: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.buyerAddress1")}
            type="text"
            value={input().buyerAddress1}
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
            onChange={(event) =>
              handleChange({ buyerAddress2: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.buyerAddress2")}
            type="text"
            value={input().buyerAddress2}
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
            onChange={(event) =>
              handleChange({ buyerName: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.buyerName")}
            type="text"
            value={input().buyerName}
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
            onChange={(event) =>
              handleChange({ buyerNip: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.buyerNip")}
            type="text"
            value={input().buyerNip}
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
            onChange={(event) =>
              handleChange({ paymentAccount: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.paymentAccount")}
            type="text"
            value={input().paymentAccount}
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
            onChange={(event) =>
              handleChange({ paymentBank: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.paymentBank")}
            type="text"
            value={input().paymentBank}
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
            onChange={(event) =>
              handleChange({ serviceCount: event.currentTarget.valueAsNumber })
            }
            placeholder={t("invoiceForm.serviceCount")}
            type="number"
            min={0}
            step={1}
            value={input().serviceCount}
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
            onChange={(event) =>
              handleChange({ servicePrice: event.currentTarget.valueAsNumber })
            }
            placeholder={t("invoiceForm.servicePrice")}
            type="number"
            min={0}
            step={1}
            value={input().servicePrice}
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
            onChange={(event) =>
              handleChange({ serviceTitle: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.serviceTitle")}
            type="text"
            value={input().serviceTitle}
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
            onChange={(event) =>
              handleChange({ serviceUnit: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.serviceUnit")}
            type="text"
            value={input().serviceUnit}
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
            onChange={(event) =>
              handleChange({ notes: event.currentTarget.value })
            }
            placeholder={t("invoiceForm.notes")}
            type="text"
            value={input().notes}
          />
        </div>
        <Show when={props.error} keyed>
          {(error) => <div class="text-sm text-red-400">{error}</div>}
        </Show>
        <div class="col-span-2 flex w-full justify-end gap-2">
          <button
            disabled={props.isLoading}
            class={clsx("btn btn-primary", { loading: props.isLoading })}
            type="button"
            onClick={handleSubmit}
          >
            {t("invoiceForm.save")}
          </button>
        </div>
      </props.Form>
    </div>
  );
};
