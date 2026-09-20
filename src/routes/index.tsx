import { createFileRoute } from "@tanstack/react-router";
import { CsvViewer } from "@/components/csv/CsvViewer";
import { HomePageContent } from "@/components/csv/HomePageContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "CSV Viewer & Editor — View, Edit, and Manage CSV Files Online",
      },
      {
        name: "description",
        content:
          "Open, view, and edit CSV files directly in your browser — no software to install, no account required. Supports comma, semicolon, tab, and pipe delimiters.",
      },
      {
        property: "og:title",
        content: "CSV Viewer & Editor — View, Edit, and Manage CSV Files Online",
      },
      {
        property: "og:description",
        content:
          "Open, view, and edit CSV files directly in your browser — no software to install, no account required. Supports comma, semicolon, tab, and pipe delimiters.",
      },
      { property: "og:url", content: "https://csvviewer.github.io/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "CSV Viewer & Editor — View, Edit, and Manage CSV Files Online",
      },
      {
        name: "twitter:description",
        content:
          "Open, view, and edit CSV files directly in your browser — no software to install, no account required.",
      },
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
  return (
    <div className="w-full space-y-8">
      <div className="space-y-3 max-w-4xl mx-auto pt-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          CSV Viewer &amp; Editor — View, Edit, and Manage CSV Files Online
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Open, view, and edit CSV files directly in your browser — no software to install, no
          account required. Upload a .csv file below to see it rendered as an editable table, or
          paste your data straight in. The tool supports comma, semicolon, tab, and pipe-delimited
          files, and everything you edit can be downloaded as a clean CSV file when you're done.
        </p>
      </div>

      <div id="viewer">
        <CsvViewer />
      </div>

      <HomePageContent />
    </div>
  );
}
