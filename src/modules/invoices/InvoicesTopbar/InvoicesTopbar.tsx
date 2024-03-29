import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { A } from "solid-start";
import { buttonClass } from "~/components/Button";
import { Navbar } from "~/components/Navbar";
import { paths } from "~/utils/paths";

export const InvoicesTopbar: Component = () => {
  const [t] = useI18n();

  return (
    <Navbar class="flex w-full justify-between px-8 print:invisible print:hidden">
      <A href={paths.invoices}>{t("topbar.home")}</A>
      <div>
        <A
          href={paths.addInvoice}
          class={buttonClass({ size: "sm", variant: "link" })}
        >
          {t("topbar.addInvoice")}
        </A>
      </div>
    </Navbar>
  );
};
