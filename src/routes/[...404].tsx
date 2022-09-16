import { useI18n } from "@solid-primitives/i18n";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { paths } from "~/utils/paths";

const NotFound: Component = () => {
  const [t] = useI18n();

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        {t("notFound.header")}
      </h1>
      <p class="my-4">
        <Link href={paths.index} class="text-sky-600 hover:underline">
          {t("notFound.home")}
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
