// @refresh reload
import { JSX, lazy, Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Meta,
  Route,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { SessionProvider } from "./utils/supabase";

const Root = (): JSX.Element => {
  return (
    <Html lang="en" data-theme="corporate">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <SessionProvider>
              <Routes>
                <Route
                  path="/"
                  component={lazy(() => import("./modules/Root/Root"))}
                >
                  <Route
                    path="/login"
                    component={lazy(() => import("./modules/Public/Public"))}
                  />
                  <Route
                    path="/"
                    component={lazy(
                      () => import("./modules/Protected/Protected")
                    )}
                  >
                    <Route
                      path="/"
                      component={lazy(
                        () => import("./modules/Invoices/Invoices")
                      )}
                    />
                  </Route>
                </Route>
                {/* <FileRoutes /> */}
              </Routes>
            </SessionProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
};

export default Root;
