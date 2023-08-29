import dotenv from "dotenv";
import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ adapter: vercel() })],
    ssr: { noExternal: ["@kobalte/core"] },
  };
});
