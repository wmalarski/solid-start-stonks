import { useI18n } from "@solid-primitives/i18n";
import { For, JSX } from "solid-js";
import type { Invoice } from "~/server/types";
import { InvoiceItem } from "./InvoiceItem/InvoiceItem";

type Props = {
  invoices: Invoice[];
};

export const Invoices = (props: Props): JSX.Element => {
  const [t] = useI18n();

  return (
    <div class="flex flex-col gap-4 w-full p-4">
      <h1 class="font-semibold text-lg">{t("invoices.header")}</h1>
      <For each={props.invoices}>
        {(invoice) => <InvoiceItem invoice={invoice} />}
      </For>
    </div>
  );
};
