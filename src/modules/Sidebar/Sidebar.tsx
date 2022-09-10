import { JSX } from "solid-js";
import { supabase } from "~/utils/supabase";

export const Sidebar = (): JSX.Element => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
    // TODO show toast
  };

  return (
    <ul class="menu bg-base-100 w-56 p-2 rounded-box">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
};
