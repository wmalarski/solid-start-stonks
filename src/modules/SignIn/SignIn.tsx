import { createSignal, JSX } from "solid-js";
import { supabase } from "~/server/supabase";
import { getBaseUrl } from "~/utils/baseUrl";
import { MagicLinkForm } from "./MagicLinkForm/MagicLinkForm";

export const SignIn = (): JSX.Element => {
  const [status, setStatus] = createSignal({
    error: "",
    isLoading: false,
    isSuccess: false,
  });

  const handleSubmit = async (email: string) => {
    setStatus({ error: "", isLoading: true, isSuccess: false });

    const redirectTo = `${getBaseUrl()}/magic-link`;

    const result = await supabase.auth.signIn({ email }, { redirectTo });

    if (result.error) {
      setStatus({
        error: result.error?.message,
        isLoading: false,
        isSuccess: false,
      });
      return;
    }

    setStatus({ error: "", isLoading: false, isSuccess: true });
  };

  return (
    <MagicLinkForm
      onSubmit={handleSubmit}
      error={status().error}
      isLoading={status().isLoading}
      isSuccess={status().isSuccess}
    />
  );
};
