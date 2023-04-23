import { useI18n } from "@solid-primitives/i18n";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import type { Component } from "solid-js";
import { useNavigate } from "solid-start";
import {
  InvoiceForm,
  type InvoiceFormData,
} from "~/modules/invoices/InvoiceForm";
import { InvoicesTopbar } from "~/modules/invoices/InvoicesTopbar";
import {
  insertInvoiceServerMutation,
  selectAllInvoicesKey,
} from "~/server/invoices";
import { getServerError } from "~/utils/errors";
import { paths } from "~/utils/paths";

const AddInvoicePage: Component = () => {
  const [t] = useI18n();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const insertMutation = createMutation(() => ({
    mutationFn: insertInvoiceServerMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: selectAllInvoicesKey(),
      });

      navigate(paths.invoice(data.id));
    },
  }));

  const onSubmit = (data: InvoiceFormData) => {
    insertMutation.mutate(data);
  };

  return (
    <div class="grid w-full grid-cols-1 grid-rows-[auto_1fr] items-start">
      <InvoicesTopbar />
      <h1 class="px-8 text-3xl font-semibold">{t("addInvoice.header")}</h1>
      <div class="p-8 pt-0">
        <InvoiceForm
          error={getServerError(insertMutation.error)}
          isLoading={insertMutation.isPending}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AddInvoicePage;
