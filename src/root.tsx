// @refresh reload
import { I18nContext } from "@solid-primitives/i18n";
import { JSX, Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { i18n } from "./utils/i18n";
import { SessionProvider } from "./utils/supabase";

const Root = (): JSX.Element => {
  return (
    <Html lang="en" data-theme="corporate">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="min-h-screen">
        <Suspense>
          <ErrorBoundary>
            <I18nContext.Provider value={i18n}>
              <SessionProvider>
                <Routes>
                  <FileRoutes />
                </Routes>
              </SessionProvider>
            </I18nContext.Provider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
};

export default Root;
