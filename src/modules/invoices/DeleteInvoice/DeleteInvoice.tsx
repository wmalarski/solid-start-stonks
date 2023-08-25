import { useI18n } from "@solid-primitives/i18n";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import type { Component, JSX } from "solid-js";
import { useNavigate } from "solid-start";
import { Button } from "~/components/Button";
import { type Invoice } from "~/db/invoices";
import {
  deleteInvoiceServerMutation,
  selectAllInvoicesKey,
} from "~/server/invoices";
import { paths } from "~/utils/paths";

type Props = {
  invoice: Invoice;
};

export const DeleteInvoice: Component<Props> = (props) => {
  const [t] = useI18n();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteMutation = createMutation(() => ({
    mutationFn: deleteInvoiceServerMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: selectAllInvoicesKey(),
      });

      navigate(paths.invoices());
    },
  }));

  const onSubmit: JSX.FormHTMLAttributes<HTMLFormElement>["onSubmit"] = (
    event,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    deleteMutation.mutate({ id: form.get("id") as string });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="id" id="id" value={props.invoice.id} />
      <Button
        color="warning"
        disabled={deleteMutation.isPending}
        isLoading={deleteMutation.isPending}
        size="sm"
        type="submit"
        variant="ghost"
      >
        {t("topbar.removeInvoice")}
      </Button>
    </form>
  );
};
