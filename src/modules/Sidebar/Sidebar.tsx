import { signOut } from "@auth/solid-start/client";
import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { A } from "solid-start";
import { paths } from "~/utils/paths";

export const Sidebar: Component = () => {
  const [t] = useI18n();

  const handleClick = () => {
    signOut();
  };

  return (
    <div
      data-theme="black"
      class="flex min-h-screen flex-col justify-between py-4 print:invisible print:hidden"
    >
      <ul class="menu w-56 p-2 ">
        <li>
          <A class="text-sm" activeClass="active" href={paths.index}>
            {t("sidebar.home")}
          </A>
        </li>
      </ul>
      <ul class="menu w-56 p-2 ">
        <li>
          <button onClick={handleClick} class="text-sm">
            {t("sidebar.logout")}
          </button>
        </li>
      </ul>
    </div>
  );
};
