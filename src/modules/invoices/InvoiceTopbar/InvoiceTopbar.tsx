import { As } from "@kobalte/core";
import { useI18n } from "@solid-primitives/i18n";
import { For, createMemo, type Component } from "solid-js";
import { A } from "solid-start";
import {
  BreadcrumbsItem,
  BreadcrumbsList,
  BreadcrumbsRoot,
} from "~/components/Breadcrumbs";
import { buttonClass } from "~/components/Button";
import { Navbar } from "~/components/Navbar";
import type { Invoice } from "~/server/invoices/api";
import { paths } from "~/utils/paths";
import { DeleteInvoice } from "../DeleteInvoice";

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
        text: props.invoice.invoiceTitle,
      },
      ...(props.breadcrumbs || []),
    ];
  });

  return (
    <Navbar class="flex w-full justify-between px-8 print:invisible print:hidden">
      <BreadcrumbsRoot>
        <BreadcrumbsList>
          <For each={breadcrumbs()}>
            {({ path, text }, index) => (
              <BreadcrumbsItem
                asChild
                hasSeparator={index() !== breadcrumbs().length}
              >
                <As component={A} href={path}>
                  {text}
                </As>
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
    </Navbar>
  );
};
