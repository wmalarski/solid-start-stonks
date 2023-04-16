import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { A } from "solid-start";
import {
  BreadcrumbsItem,
  BreadcrumbsList,
  BreadcrumbsRoot,
} from "~/components/Breadcrumbs";
import { buttonClass } from "~/components/Button";
import { paths } from "~/utils/paths";

export const InvoicesTopbar: Component = () => {
  const [t] = useI18n();

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <BreadcrumbsRoot class="breadcrumbs text-sm">
        <BreadcrumbsList>
          <BreadcrumbsItem asChild>
            <A href={paths.invoices()}>{t("topbar.home")}</A>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </BreadcrumbsRoot>
      <div>
        <A
          href={paths.addInvoice}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.addInvoice")}
        </A>
      </div>
    </div>
  );
};
