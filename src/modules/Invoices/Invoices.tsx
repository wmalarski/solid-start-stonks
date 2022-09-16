import { Component, For } from "solid-js";
import type { Invoice } from "~/server/types";
import { InvoiceItem } from "./InvoiceItem/InvoiceItem";

type Props = {
  invoices: Invoice[];
};

export const Invoices: Component<Props> = (props) => {
  return (
    <div class="flex w-full flex-col gap-4 px-8">
      <For each={props.invoices}>
        {(invoice) => <InvoiceItem invoice={invoice} />}
      </For>
    </div>
  );
};
