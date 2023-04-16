import { useI18n } from "@solid-primitives/i18n";
import { Component, For, createMemo } from "solid-js";
import { A } from "solid-start";
import {
  BreadcrumbsItem,
  BreadcrumbsList,
  BreadcrumbsRoot,
} from "~/components/Breadcrumbs";
import { buttonClass } from "~/components/Button";
import { Invoice } from "~/db/invoices";
import { paths } from "~/utils/paths";
import { DeleteInvoice } from "../DeleteInvoice/DeleteInvoice";

type Props = {
  invoice: Invoice;
  breadcrumbs?: { path: string; text: string }[];
};

export const InvoiceTopbar: Component<Props> = (props) => {
  const [t] = useI18n();

  const breadcrumbs = createMemo(() => {
    return [
      { path: paths.invoices(), text: t("topbar.home") },
      {
        path: paths.invoice(props.invoice.id),
        text: props.invoice.invoice_title,
      },
      ...(props.breadcrumbs || []),
    ];
  });

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <BreadcrumbsRoot>
        <BreadcrumbsList>
          <For each={breadcrumbs()}>
            {({ path, text }, index) => (
              <BreadcrumbsItem
                asChild
                hasSeparator={index() !== breadcrumbs().length}
              >
                <A href={path}>{text}</A>
              </BreadcrumbsItem>
            )}
          </For>
        </BreadcrumbsList>
      </BreadcrumbsRoot>
      <div>
        <A
          href={paths.editInvoice(props.invoice.id)}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.editInvoice")}
        </A>
        <A
          href={paths.copyInvoice(props.invoice.id)}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.copyInvoice")}
        </A>
        <DeleteInvoice invoice={props.invoice} />
      </div>
    </div>
  );
};
