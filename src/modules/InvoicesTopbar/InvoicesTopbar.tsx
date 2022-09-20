import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { paths } from "~/utils/paths";

export const InvoicesTopbar: Component = () => {
  const [t] = useI18n();

  return (
    <div class="navbar flex w-full justify-between px-8 print:invisible print:hidden">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={paths.invoices()}>{t("topbar.home")}</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link href={paths.addInvoice} class="btn btn-link btn-sm">
          {t("topbar.addInvoice")}
        </Link>
      </div>
    </div>
  );
};
