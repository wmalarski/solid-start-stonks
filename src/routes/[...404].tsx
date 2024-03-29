import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { A } from "solid-start";
import { paths } from "~/utils/paths";

const NotFound: Component = () => {
  const [t] = useI18n();

  return (
    <main class="mx-auto p-4 text-center text-gray-700">
      <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">
        {t("notFound.header")}
      </h1>
      <p class="my-4">
        <A href={paths.index} class="text-sky-600 hover:underline">
          {t("notFound.home")}
        </A>
      </p>
    </main>
  );
};

export default NotFound;
