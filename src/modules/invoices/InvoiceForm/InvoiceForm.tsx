import { useI18n } from "@solid-primitives/i18n";
import { Show, createSignal, type Component, type JSX } from "solid-js";
import type { ZodIssue } from "zod";
import { Button } from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import { DatePicker } from "~/components/DatePicker";
import { Divider } from "~/components/Divider";
import {
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldRoot,
  type TextFieldInputProps,
} from "~/components/TextField";
import type { Invoice } from "~/db/invoices";

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
  userId: "",
};

type FormItemContainerProps = {
  children: JSX.Element;
  error?: ZodIssue;
  id: string;
  label: string;
};

const FormItemContainer: Component<FormItemContainerProps> = (props) => {
  return (
    <TextFieldRoot>
      <TextFieldLabel for={props.id} class="font-semibold">
        {props.label}
      </TextFieldLabel>
      <div class="flex w-full flex-col gap-2">
        {props.children}
        <Show when={props.error}>
          {(error) => (
            <TextFieldErrorMessage>{error().message}</TextFieldErrorMessage>
          )}
        </Show>
      </div>
    </TextFieldRoot>
  );
};

type FormInputItemProps = TextFieldInputProps & {
  error?: ZodIssue;
  id: string;
  isLoading: boolean;
  label: string;
};

const FormInputItem: Component<FormInputItemProps> = (props) => {
  return (
    <FormItemContainer label={props.label} id={props.id} error={props.error}>
      <TextFieldInput
        class="grow"
        variant="bordered"
        size="sm"
        disabled={props.isLoading}
        id={props.id}
        min={props.min}
        name={props.name}
        placeholder={props.label}
        step={props.step}
        type={props.type}
        value={props.value}
      />
    </FormItemContainer>
  );
};

const FormDivider: Component = () => {
  return <Divider class="col-span-2" />;
};

type SubHeadingProps = {
  children: JSX.Element;
};

const SubHeading: Component<SubHeadingProps> = (props) => {
  return <h3 class="col-span-2 text-xl">{props.children}</h3>;
};

type Props = {
  error?: Record<string, ZodIssue>;
  id?: string;
  initial?: InvoiceFormData;
  isLoading: boolean;
  onSubmit: (data: InvoiceFormData) => void;
};

export const InvoiceForm: Component<Props> = (props) => {
  const [t] = useI18n();

  const [date, setDate] = createSignal(new Date(formDefault.date));

  const initial = () => {
    return { ...formDefault, ...props.initial };
  };

  const onSubmit: JSX.FormHTMLAttributes<HTMLFormElement>["onSubmit"] = (
    event,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    // TODO use form library
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.onSubmit(Object.fromEntries(form.entries()) as any);
  };

  return (
    <Card class="shadow-xl">
      <CardBody component="form" onSubmit={onSubmit} class="grid w-full gap-2">
        <Show when={props.id}>
          {(id) => <input id="id" name="id" type="hidden" value={id()} />}
        </Show>
        <input
          id="date"
          name="date"
          type="hidden"
          value={date().toISOString()}
        />
        <input
          id="paymentMethod"
          name="payment_method"
          type="hidden"
          value={initial().payment_method}
        />
        <input
          id="servicePayed"
          name="service_payed"
          type="hidden"
          value={initial().service_payed}
        />
        <SubHeading>{t("invoiceForm.general")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="city"
          name="city"
          label={t("invoiceForm.city")}
          type="text"
          value={initial().city}
          error={props.error?.city}
        />
        <FormItemContainer
          id="date"
          label={t("invoiceForm.date")}
          error={props.error?.date}
        >
          <DatePicker
            isDisabled={props.isLoading}
            id="date"
            value={date()}
            onChange={setDate}
          />
        </FormItemContainer>
        <FormInputItem
          isLoading={props.isLoading}
          id="invoiceTitle"
          name="invoice_title"
          label={t("invoiceForm.invoiceTitle")}
          type="text"
          value={initial().invoice_title}
          error={props.error?.invoice_title}
        />
        <FormDivider />
        <SubHeading>{t("invoiceForm.seller")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="sellerAddress1"
          name="seller_address1"
          label={t("invoiceForm.sellerAddress1")}
          type="text"
          value={initial().seller_address1}
          error={props.error?.seller_address1}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="sellerAddress2"
          name="seller_address2"
          label={t("invoiceForm.sellerAddress2")}
          type="text"
          value={initial().seller_address2}
          error={props.error?.seller_address2}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="sellerName"
          name="seller_name"
          label={t("invoiceForm.sellerName")}
          type="text"
          value={initial().seller_name}
          error={props.error?.seller_name}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="sellerNip"
          name="seller_nip"
          label={t("invoiceForm.sellerNip")}
          type="text"
          value={initial().seller_nip}
          error={props.error?.seller_nip}
        />
        <FormDivider />
        <SubHeading>{t("invoiceForm.buyer")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="buyerAddress1"
          name="buyer_address_1"
          label={t("invoiceForm.buyerAddress1")}
          type="text"
          value={initial().buyer_address_1}
          error={props.error?.buyer_address_1}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="buyerAddress2"
          name="buyer_address_2"
          label={t("invoiceForm.buyerAddress2")}
          type="text"
          value={initial().buyer_address_2}
          error={props.error?.buyer_address_2}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="buyerName"
          name="buyer_name"
          label={t("invoiceForm.buyerName")}
          type="text"
          value={initial().buyer_name}
          error={props.error?.buyer_name}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="buyerNip"
          name="buyer_nip"
          label={t("invoiceForm.buyerNip")}
          type="text"
          value={initial().buyer_nip}
          error={props.error?.buyer_nip}
        />
        <FormDivider />
        <SubHeading>{t("invoiceForm.payment")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="paymentAccount"
          name="payment_account"
          label={t("invoiceForm.paymentAccount")}
          type="text"
          value={initial().payment_account}
          error={props.error?.payment_account}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="paymentBank"
          name="payment_bank"
          label={t("invoiceForm.paymentBank")}
          type="text"
          value={initial().payment_bank}
          error={props.error?.payment_bank}
        />
        <FormDivider />
        <SubHeading>{t("invoiceForm.service")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="serviceCount"
          name="service_count"
          label={t("invoiceForm.serviceCount")}
          type="number"
          min={0}
          step={1}
          value={initial().service_count}
          error={props.error?.service_count}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="servicePrice"
          name="service_price"
          label={t("invoiceForm.servicePrice")}
          type="number"
          min={0}
          step={1}
          value={initial().service_price}
          error={props.error?.service_price}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="serviceTitle"
          name="service_title"
          label={t("invoiceForm.serviceTitle")}
          type="text"
          value={initial().service_title}
          error={props.error?.service_title}
        />
        <FormInputItem
          isLoading={props.isLoading}
          id="serviceUnit"
          name="service_unit"
          label={t("invoiceForm.serviceUnit")}
          type="text"
          value={initial().service_unit}
          error={props.error?.service_unit}
        />
        <FormDivider />
        <SubHeading>{t("invoiceForm.notes")}</SubHeading>
        <FormInputItem
          isLoading={props.isLoading}
          id="notes"
          name="notes"
          label={t("invoiceForm.notes")}
          type="text"
          value={initial().notes}
          error={props.error?.notes}
        />
        <div class="col-span-2 flex w-full justify-end gap-2">
          <Button
            color="primary"
            disabled={props.isLoading}
            isLoading={props.isLoading}
            type="submit"
          >
            {t("invoiceForm.save")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
