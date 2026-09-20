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
import { Logo } from "@/components/Logo";
import { BackToTop } from "@/components/BackToTop";
import { ViewerLayoutProvider, useViewerLayout } from "@/context/ViewerLayoutContext";

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
      {
        title: "CSV Viewer & Editor Online — Fast, Free, Private, in Browser",
      },
      {
        name: "description",
        content:
          "Free CSV Viewer & Editor online. Open, view, edit, sort, and filter CSV files directly in your browser. Fast, private, and no software or account required.",
      },
      { name: "author", content: "CSV Viewer" },
      {
        property: "og:title",
        content: "CSV Viewer & Editor Online — Fast, Free, Private, in Browser",
      },
      {
        property: "og:description",
        content:
          "Free CSV Viewer & Editor online. Open, view, edit, sort, and filter CSV files directly in your browser. Fast, private, and no software or account required.",
      },
      { property: "og:url", content: "https://csvviewer.github.io/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CSV Viewer & Editor Online" },
      { property: "og:image", content: "https://csvviewer.github.io/og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "CSV Viewer & Editor Online — Fast, Free, Private, in Browser",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "CSV Viewer & Editor Online — Fast, Free, Private, in Browser",
      },
      {
        name: "twitter:description",
        content:
          "Free CSV Viewer & Editor online. Open, view, edit, sort, and filter CSV files directly in your browser. Fast, private, and no software or account required.",
      },
      { name: "twitter:image", content: "https://csvviewer.github.io/og.png" },
      {
        name: "google-site-verification",
        content: "hACx7f0QfZ3hgPRjNzYJCbvWN8F0GFDhn8dUlacw9lw",
      },
      {
        name: "msvalidate.01",
        content: "53E47B20B5F728E50CFF5E42E08C4872",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://csvviewer.github.io/",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const schemaJson = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSV Viewer & Editor Online",
    url: "https://csvviewer.github.io/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free CSV Viewer & Editor online. Open, view, edit, sort, and filter CSV files directly in your browser. Fast, private, and no software or account required.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my CSV data uploaded to any server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All parsing, filtering, and data manipulation happen strictly on your local machine via your browser's JavaScript engine. Your files are never sent over the network, ensuring complete confidentiality for sensitive financial, legal, or personal data.",
        },
      },
      {
        "@type": "Question",
        name: "How does this tool handle large CSV files with 100,000+ rows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSV Viewer uses DOM virtualization powered by TanStack Virtual. It only mounts the rows currently visible inside your viewport, allowing you to scroll through massive datasets (100k+ rows) with zero latency and 60fps responsiveness.",
        },
      },
      {
        "@type": "Question",
        name: "Can I edit cell values and export my changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Double-click any cell in the grid to edit its content. You can undo edits at any time with Ctrl+Z. Once finished, you can export your data to CSV, TSV, JSON, or Markdown tables, or copy directly to your clipboard.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats and delimiters are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSV Viewer supports CSV (.csv), TSV (.tsv), and plain text (.txt) files. You can choose between automatic delimiter detection or manually specify comma, semicolon, tab, or pipe delimiters, with support for UTF-8, Windows-1252, ISO-8859-1, UTF-16, and Shift-JIS encodings.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install software or create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. CSV Viewer is 100% free, requires no login, no cookies, and no software installation. Use it directly in your browser anytime.",
        },
      },
    ],
  },
];

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaJson),
          }}
        />
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

  return (
    <QueryClientProvider client={queryClient}>
      <ViewerLayoutProvider>
        <RootApp />
      </ViewerLayoutProvider>
    </QueryClientProvider>
  );
}

function RootApp() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { isFullBody } = useViewerLayout();

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
    <div
      className={`flex min-h-screen flex-col bg-background text-foreground ${
        isFullBody ? "h-screen overflow-hidden" : ""
      }`}
    >
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
        <div
          className={`mx-auto flex h-14 items-center justify-between px-4 sm:px-6 ${
            isFullBody ? "w-full max-w-none" : "max-w-7xl"
          }`}
        >
          <div className="flex items-center gap-6">
            <a href="#viewer" className="flex items-center gap-3">
              <Logo />
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                <Shield className="size-3 text-emerald-500" /> 100% In-Browser
              </span>
            </a>

            <nav className="flex items-center gap-1 text-xs">
              <a
                href="#viewer"
                className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
              >
                Viewer
              </a>
              {!isFullBody && (
                <>
                  <a
                    href="#guide"
                    className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
                  >
                    Guide
                  </a>
                  <a
                    href="#faq"
                    className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
                  >
                    FAQ
                  </a>
                </>
              )}
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
      <main
        className={
          isFullBody
            ? "flex-1 w-full px-2 sm:px-4 py-2 flex flex-col min-h-0 overflow-hidden"
            : "flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4"
        }
      >
        <Outlet />
      </main>

      {/* Footer */}
      {!isFullBody && (
        <footer className="border-t border-border/60 bg-muted/20 py-8 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-2">
              <Shield className="size-3.5 text-emerald-500" />
              <span>
                CSV Viewer &amp; Editor Online — 100% Client-Side. Files never leave your device.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#viewer" className="hover:text-foreground transition-colors">
                Viewer
              </a>
              <a href="#guide" className="hover:text-foreground transition-colors">
                Guide
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
              <a
                href="mailto:me@junaid.pro.bd"
                className="text-primary hover:underline font-medium transition-colors"
              >
                me@junaid.pro.bd
              </a>
            </div>
          </div>
        </footer>
      )}

      {/* Global Notifications */}
      <Toaster position="bottom-right" richColors />

      {/* Global Shortcuts Dialog */}
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

      {/* Floating Back To Top / Viewer Button */}
      {!isFullBody && <BackToTop />}
    </div>
  );
}
