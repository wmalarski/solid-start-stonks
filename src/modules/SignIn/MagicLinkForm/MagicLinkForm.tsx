import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component, createSignal, Show } from "solid-js";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type Props = {
  onSubmit: (email: string) => void;
  isSuccess: boolean;
  isLoading: boolean;
  error: string;
};

export const MagicLinkForm: Component<Props> = (props) => {
  const [t] = useI18n();

  const [email, setEmail] = createSignal("");
  const [parseError, setParseError] = createSignal("");

  const handleSendLink = () => {
    const parsed = schema.safeParse({ email: email() });

    if (!parsed.success) {
      setParseError("Incorrect email value");
      return;
    }

    props.onSubmit(parsed.data.email);
  };

  return (
    <div class="card bg-base-300 w-fit">
      <div class="card-body">
        <h3 class="card-title">{t("magicLink.header")}</h3>
        <div class="pb-2">{t("magicLink.subheader")}</div>
        <div class="w-full">
          <input
            class="input w-full"
            disabled={props.isLoading}
            id="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder="Email"
            type="text"
            value={email()}
          />
          <Show when={props.error} keyed>
            {(error) => <div class="text-sm text-red-400">{error}</div>}
          </Show>
          <Show when={parseError()} keyed>
            {(error) => <div class="text-sm text-red-400">{error}</div>}
          </Show>
          <Show when={props.isSuccess}>
            <div class="text-sm text-green-600">{t("magicLink.success")}</div>
          </Show>
        </div>
        <div class="card-actions pt-3 relative">
          <button
            class={clsx("btn btn-primary w-full", { loading: props.isLoading })}
            disabled={props.isLoading}
            onClick={handleSendLink}
            type="button"
          >
            {t("magicLink.button")}
          </button>
        </div>
      </div>
    </div>
  );
};
