import { createFileRoute } from "@tanstack/react-router";
import { CsvViewer } from "@/components/csv/CsvViewer";
import { HomePageContent } from "@/components/csv/HomePageContent";
import { useViewerLayout } from "@/context/ViewerLayoutContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "CSV Viewer & Editor Online — Fast, Free, Private, in Browser",
      },
      {
        name: "description",
        content:
          "Free CSV Viewer & Editor online. Open, view, edit, sort, and filter CSV files directly in your browser. Fast, private, and no software or account required.",
      },
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
    ],
    links: [
      {
        rel: "canonical",
        href: "https://csvviewer.github.io/",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { isFullBody } = useViewerLayout();

  return (
    <div className={isFullBody ? "w-full h-full flex flex-col min-h-0 flex-1" : "w-full space-y-8"}>
      {!isFullBody && (
        <div className="space-y-3 max-w-4xl mx-auto pt-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            CSV Viewer &amp; Editor Online — Fast, Free, Private, in Browser
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Free CSV Viewer &amp; Editor online. Open, view, edit, sort, and filter CSV files
            directly in your browser. Fast, private, and no software or account required. Upload a
            .csv file below to see it rendered as an editable table, or paste your data straight in.
            The tool supports comma, semicolon, tab, and pipe-delimited files, and everything you
            edit can be downloaded as a clean CSV file when you're done.
          </p>
        </div>
      )}

      <div
        id="viewer"
        className={isFullBody ? "flex-1 flex flex-col min-h-0 h-full w-full" : "w-full"}
      >
        <CsvViewer />
      </div>

      {!isFullBody && <HomePageContent />}
    </div>
  );
}
