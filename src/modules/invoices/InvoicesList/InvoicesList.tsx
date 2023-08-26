import { useI18n } from "@solid-primitives/i18n";
import { For, type Component } from "solid-js";
import { A } from "solid-start";
import { buttonClass } from "~/components/Button";
import { Card, CardActions, CardBody, CardTitle } from "~/components/Card";
import { Divider } from "~/components/Divider";
import { useDateFormatter } from "~/components/utils/format";
import type { Invoice } from "~/server/notionInvoices";
import { paths } from "~/utils/paths";
import { DeleteInvoice } from "../DeleteInvoice";
import { InvoiceCompany, InvoiceSummary } from "../InvoicePrimitives";

type InvoiceItemProps = {
  invoice: Invoice;
};

const InvoiceItem: Component<InvoiceItemProps> = (props) => {
  const [t] = useI18n();

  const dateFormatter = useDateFormatter();

  return (
    <Card class="w-full shadow-xl">
      <CardBody component="div" class="bg-base-100">
        <div class="flex justify-between">
          <CardTitle component="h2" class="text-2xl font-extrabold">
            {t("invoice.title", { title: props.invoice.invoiceTitle })}
          </CardTitle>
          <span class="col-span-2 text-right text-sm">
            {t("invoice.header", {
              city: props.invoice.city,
              date: dateFormatter(props.invoice.date),
            })}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-x-16 gap-y-2">
          <InvoiceCompany
            address1={props.invoice.sellerAddress1}
            address2={props.invoice.sellerAddress2}
            name={props.invoice.sellerName}
            nip={props.invoice.sellerNip}
            title={t("invoice.seller")}
          />
          <InvoiceCompany
            address1={props.invoice.buyerAddress1}
            address2={props.invoice.buyerAddress2}
            name={props.invoice.buyerName}
            nip={props.invoice.buyerNip}
            title={t("invoice.buyer")}
          />
          <Divider class="col-span-2" />
          <InvoiceSummary class="col-span-2" invoice={props.invoice} />
        </div>
        <CardActions>
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.invoice(props.invoice.id)}
          >
            {t("invoices.more")}
          </A>
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.editInvoice(props.invoice.id)}
          >
            {t("topbar.editInvoice")}
          </A>
          <A
            class={buttonClass({ size: "sm", variant: "link" })}
            href={paths.copyInvoice(props.invoice.id)}
          >
            {t("topbar.copyInvoice")}
          </A>
          <DeleteInvoice invoice={props.invoice} />
        </CardActions>
      </CardBody>
    </Card>
  );
};

type Props = {
  invoices: Invoice[];
};

export const InvoicesList: Component<Props> = (props) => {
  return (
    <div class="flex w-full flex-col gap-4 px-8">
      <For each={props.invoices}>
        {(invoice) => <InvoiceItem invoice={invoice} />}
      </For>
    </div>
  );
};
