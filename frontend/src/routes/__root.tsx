import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Navbar } from "@/components/site/Navbar";

function NotFoundComponent() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-strong rounded-3xl p-10 max-w-md text-center">
          <div className="text-7xl font-display font-bold text-gradient">404</div>
          <h2 className="mt-2 text-xl font-semibold text-white">Signal lost</h2>
          <p className="mt-2 text-sm text-white/60">
            The page you're looking for isn't in our sensor grid.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground btn-glow"
          >
            Return home
          </Link>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <AnimatedBackground />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-strong rounded-3xl p-8 max-w-md text-center">
          <h1 className="text-xl font-semibold text-white">This page didn't load</h1>
          <p className="mt-2 text-sm text-white/60">
            Something went wrong on our end. Try refreshing or head back home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => { router.invalidate(); reset(); }}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground btn-glow"
            >
              Try again
            </button>
            <a href="/" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white">
              Go home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TrinetraAI — Intelligent Vision. Safer Schools." },
      { name: "description", content: "AI surveillance that turns any school camera into a proactive safety officer. Detect bullying, weapons, fires and medical emergencies in real time." },
      { name: "theme-color", content: "#07111F" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "TrinetraAI — Intelligent Vision. Safer Schools." },
      { property: "og:description", content: "AI surveillance that turns any school camera into a proactive safety officer. Detect bullying, weapons, fires and medical emergencies in real time." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TrinetraAI — Intelligent Vision. Safer Schools." },
      { name: "twitter:description", content: "AI surveillance that turns any school camera into a proactive safety officer. Detect bullying, weapons, fires and medical emergencies in real time." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f36423cf-5868-497a-9bfb-d24716d83769/id-preview-d3fbc9f4--0f2dbc09-955a-47db-a658-d0c1fd39ff49.lovable.app-1784807031150.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f36423cf-5868-497a-9bfb-d24716d83769/id-preview-d3fbc9f4--0f2dbc09-955a-47db-a658-d0c1fd39ff49.lovable.app-1784807031150.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
