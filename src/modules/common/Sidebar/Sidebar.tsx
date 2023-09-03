import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { A } from "solid-start";
import { Button } from "~/components/Button";
import { Menu, MenuItem } from "~/components/Menu";
import { destroySessionServerAction } from "~/server/auth/actions";
import { paths } from "~/utils/paths";

export const Sidebar: Component = () => {
  const [t] = useI18n();

  const [signOut, { Form }] = destroySessionServerAction();

  return (
    <div
      data-theme="black"
      class="flex min-h-screen flex-col justify-between py-4 print:invisible print:hidden"
    >
      <Menu class="w-56 p-2 ">
        <MenuItem>
          <A class="text-sm" activeClass="active" href={paths.index}>
            {t("sidebar.home")}
          </A>
        </MenuItem>
      </Menu>
      <Menu class="w-56 p-2 ">
        <Form>
          <Button isLoading={signOut.pending} size="sm">
            {t("sidebar.logout")}
          </Button>
        </Form>
      </Menu>
    </div>
  );
};
