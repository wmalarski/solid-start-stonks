// @refresh reload
import { I18nContext } from "@solid-primitives/i18n";
import { Suspense, type JSX } from "solid-js";
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
              <Routes>
                <FileRoutes />
              </Routes>
            </I18nContext.Provider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
};

export default Root;
