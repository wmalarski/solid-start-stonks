import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";

export const LoadingSpinner: Component = () => {
  const [t] = useI18n();

  return <span>{t("loading")}</span>;
};
