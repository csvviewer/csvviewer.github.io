import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { FileSpreadsheet, Keyboard, Shield } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { ShortcutsDialog } from "@/components/csv/ShortcutsDialog";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to CSV Viewer
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CSV Viewer — Fast, In-Browser CSV Tool" },
      {
        name: "description",
        content:
          "Fast, in-browser CSV & TSV viewer and editor with zero-lag virtualized scrolling, deep search, column filters, stats, and multi-format export. 100% client-side, zero server uploads.",
      },
      { name: "author", content: "CSV Viewer" },
      { property: "og:title", content: "CSV Viewer — Fast, In-Browser CSV Tool" },
      {
        property: "og:description",
        content:
          "Fast, in-browser CSV & TSV viewer with zero-lag virtualized scrolling, instant search, and complete privacy. Files never leave your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CSV Viewer — Fast, In-Browser CSV Tool" },
      {
        name: "twitter:description",
        content:
          "Fast, in-browser CSV & TSV viewer with zero-lag virtualized scrolling, instant search, and complete privacy.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (e.key === "?" && !isInput) {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Navigation Header */}
        <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <FileSpreadsheet className="size-4" />
                </div>
                <span className="text-sm font-bold tracking-tight">CSV Viewer</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <Shield className="size-3 text-emerald-500" /> 100% In-Browser
                </span>
              </Link>

              <nav className="flex items-center gap-1 text-xs">
                <Link
                  to="/"
                  className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
                >
                  Viewer
                </Link>
                <Link
                  to="/about"
                  className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
                >
                  About & Privacy
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShortcutsOpen(true)}
                className="size-8 p-0 text-muted-foreground hover:text-foreground"
                title="Keyboard shortcuts (?)"
                aria-label="Keyboard shortcuts"
              >
                <Keyboard className="size-4" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-muted/20 py-4 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-2">
              <Shield className="size-3.5 text-emerald-500" />
              <span>Files never leave your browser • 100% local processing</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-foreground transition-colors">
                Viewer
              </Link>
              <Link to="/about" className="hover:text-foreground transition-colors">
                About & Privacy
              </Link>
            </div>
          </div>
        </footer>

        {/* Global Notifications */}
        <Toaster position="bottom-right" richColors />

        {/* Global Shortcuts Dialog */}
        <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      </div>
    </QueryClientProvider>
  );
}
