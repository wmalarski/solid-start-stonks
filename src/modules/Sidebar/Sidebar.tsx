import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { NavLink } from "solid-start";
import { paths } from "~/utils/paths";
import { supabase } from "~/utils/supabase";

export const Sidebar: Component = () => {
  const [t] = useI18n();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // TODO show toast
  };

  return (
    <ul class="menu bg-base-200 w-56 min-h-screen p-2 print:invisible print:hidden">
      <li>
        <NavLink activeClass="active" href={paths.index}>
          {t("sidebar.home")}
        </NavLink>
      </li>
      <li>
        <button onClick={handleLogout}>{t("sidebar.logout")}</button>
      </li>
    </ul>
  );
};
