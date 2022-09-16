import { useI18n } from "@solid-primitives/i18n";
import { Component, For } from "solid-js";
import type { Invoice } from "~/server/types";
import { InvoiceItem } from "./InvoiceItem/InvoiceItem";

type Props = {
  invoices: Invoice[];
};

export const Invoices: Component<Props> = (props) => {
  const [t] = useI18n();

  return (
    <div class="flex w-full flex-col gap-4 p-4">
      <h1 class="text-lg font-semibold">{t("invoices.header")}</h1>
      <For each={props.invoices}>
        {(invoice) => <InvoiceItem invoice={invoice} />}
      </For>
    </div>
  );
};
