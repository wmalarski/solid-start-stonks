/* eslint-disable jsx-a11y/label-has-associated-control */
import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { Invoice } from "~/server/types";

export type InvoiceFormData = Omit<Invoice, "id">;

const formDefault: InvoiceFormData = {
  buyerAddress1: "",
  buyerAddress2: "",
  buyerName: "",
  buyerNip: "",
  city: "",
  date: new Date(),
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
    <div class="flex w-full flex-col gap-2">
      <h3>{t("invoiceForm.general")}</h3>
      <div class="flex w-full gap-2">
        <label for="city" class="label label-text font-semibold">
          {t("invoiceForm.city")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="date" class="label label-text font-semibold">
          {t("invoiceForm.date")}
        </label>
        <input
          class="input input-sm grow"
          disabled={props.isLoading}
          id="date"
          onChange={(event) =>
            handleChange({ date: event.currentTarget.valueAsDate })
          }
          placeholder={t("invoiceForm.date")}
          type="date"
          value={input().date.toDateString()}
        />
      </div>
      <div class="flex w-full gap-2">
        <label for="invoiceTitle" class="label label-text font-semibold">
          {t("invoiceForm.invoiceTitle")}
        </label>
        <input
          class="input input-sm grow"
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
      <h3>{t("invoiceForm.seller")}</h3>
      <div class="flex w-full gap-2">
        <label for="sellerAddress1" class="label label-text font-semibold">
          {t("invoiceForm.sellerAddress1")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="sellerAddress2" class="label label-text font-semibold">
          {t("invoiceForm.sellerAddress2")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="sellerName" class="label label-text font-semibold">
          {t("invoiceForm.sellerName")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="sellerNip" class="label label-text font-semibold">
          {t("invoiceForm.sellerNip")}
        </label>
        <input
          class="input input-sm grow"
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
      <h3>{t("invoiceForm.buyer")}</h3>
      <div class="flex w-full gap-2">
        <label for="buyerAddress1" class="label label-text font-semibold">
          {t("invoiceForm.buyerAddress1")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="buyerAddress2" class="label label-text font-semibold">
          {t("invoiceForm.buyerAddress2")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="buyerName" class="label label-text font-semibold">
          {t("invoiceForm.buyerName")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="buyerNip" class="label label-text font-semibold">
          {t("invoiceForm.buyerNip")}
        </label>
        <input
          class="input input-sm grow"
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
      <h3>{t("invoiceForm.payment")}</h3>
      <div class="flex w-full gap-2">
        <label for="paymentAccount" class="label label-text font-semibold">
          {t("invoiceForm.paymentAccount")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="paymentBank" class="label label-text font-semibold">
          {t("invoiceForm.paymentBank")}
        </label>
        <input
          class="input input-sm grow"
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
      <h3>{t("invoiceForm.service")}</h3>
      <div class="flex w-full gap-2">
        <label for="serviceCount" class="label label-text font-semibold">
          {t("invoiceForm.serviceCount")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="servicePrice" class="label label-text font-semibold">
          {t("invoiceForm.servicePrice")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="serviceTitle" class="label label-text font-semibold">
          {t("invoiceForm.serviceTitle")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full gap-2">
        <label for="serviceUnit" class="label label-text font-semibold">
          {t("invoiceForm.serviceUnit")}
        </label>
        <input
          class="input input-sm grow"
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
      <h3>{t("invoiceForm.notes")}</h3>
      <div class="flex w-full gap-2">
        <label for="notes" class="label label-text font-semibold">
          {t("invoiceForm.notes")}
        </label>
        <input
          class="input input-sm grow"
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
      <div class="flex w-full justify-end gap-2">
        <button
          disabled={props.isLoading}
          class={clsx("btn btn-primary", { loading: props.isLoading })}
          type="button"
          onClick={handleSubmit}
        >
          {t("invoiceForm.save")}
        </button>
      </div>
    </div>
  );
};
