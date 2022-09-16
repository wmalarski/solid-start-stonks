import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { InvoiceForm } from "~/modules/InvoiceForm/InvoiceForm";

const AddInvoicePage: Component = () => {
  const [t] = useI18n();

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <h1 class="px-8 text-3xl font-semibold">{t("addInvoice.header")}</h1>
      <InvoiceForm error="" isLoading={false} onSubmit={() => void 0} />
    </div>
  );
};

export default AddInvoicePage;
