import { Component } from "solid-js";
import { Outlet } from "solid-start";
import { Sidebar } from "~/modules/Sidebar/Sidebar";

const Dashboard: Component = () => {
  return (
    <main class="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div class="max-h-screen w-full overflow-scroll">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
