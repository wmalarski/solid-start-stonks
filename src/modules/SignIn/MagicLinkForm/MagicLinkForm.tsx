import clsx from "clsx";
import { createSignal, JSX, Show } from "solid-js";
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

export const MagicLinkForm = (props: Props): JSX.Element => {
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
        <h3 class="card-title">Send magic link</h3>
        <div class="pb-2">
          To log in, or register. Use the form below to get a magic link to your
          email.
        </div>
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
            <div class="text-sm text-green-600">
              An email should arrive in your inbox shortly
            </div>
          </Show>
        </div>
        <div class="card-actions pt-3 relative">
          <button
            class={clsx("btn btn-primary w-full", { loading: props.isLoading })}
            disabled={props.isLoading}
            onClick={handleSendLink}
            type="button"
          >
            Send magic link to your email!
          </button>
        </div>
      </div>
    </div>
  );
};
