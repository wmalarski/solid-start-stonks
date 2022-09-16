import { JSX } from "solid-js";
import { NavLink } from "solid-start";
import { paths } from "~/utils/paths";
import { supabase } from "~/utils/supabase";

export const Sidebar = (): JSX.Element => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // TODO show toast
  };

  return (
    <ul class="menu bg-base-100 w-56 p-2 rounded-box print:invisible print:hidden">
      <li>
        <NavLink activeClass="active" href={paths.index}>
          Home
        </NavLink>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
};
