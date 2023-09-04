// @refresh reload
import { I18nContext } from "@solid-primitives/i18n";
import { Suspense, lazy, type JSX } from "solid-js";
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
import { CacheProvider } from "./utils/CacheProvider";
import { i18n } from "./utils/i18n";

const ToastProvider = lazy(() => import("./components/Toast/ToastProvider"));

const Root = (): JSX.Element => {
  return (
    <Html lang="en" data-theme="corporate">
      <Head>
        <Title>Solid Stonks</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="min-h-screen">
        <Suspense>
          <ErrorBoundary>
            <I18nContext.Provider value={i18n}>
              <CacheProvider>
                <Routes>
                  <FileRoutes />
                </Routes>
                <Suspense>
                  <ToastProvider />
                </Suspense>
              </CacheProvider>
            </I18nContext.Provider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
};

export default Root;
