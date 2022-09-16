import { Component, createSignal } from "solid-js";
import { getBaseUrl } from "~/utils/baseUrl";
import { supabase } from "~/utils/supabase";
import { MagicLinkForm } from "./MagicLinkForm/MagicLinkForm";

export const SignIn: Component = () => {
  const [status, setStatus] = createSignal({
    error: "",
    isLoading: false,
    isSuccess: false,
  });

  const handleSubmit = async (email: string) => {
    setStatus({ error: "", isLoading: true, isSuccess: false });

    const redirectTo = getBaseUrl();

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
