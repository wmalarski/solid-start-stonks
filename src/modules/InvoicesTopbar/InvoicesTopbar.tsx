import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { A } from "solid-start";
import { buttonClass } from "~/components/Button";
import { paths } from "~/utils/paths";

export const InvoicesTopbar: Component = () => {
  const [t] = useI18n();

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <A href={paths.invoices()}>{t("topbar.home")}</A>
          </li>
        </ul>
      </div>
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
