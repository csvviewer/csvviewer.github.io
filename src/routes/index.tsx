import { createFileRoute } from "@tanstack/react-router";
import { CsvViewer } from "@/components/csv/CsvViewer";
import { CsvArticle } from "@/components/csv/CsvArticle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "CSV Viewer & Editor Online — Fast, In-Browser CSV & TSV Tool",
      },
      {
        name: "description",
        content:
          "Free online CSV viewer and editor. Open, view, search, sort, and filter large CSV & TSV files (100k+ rows) in your browser. 100% private, zero server uploads.",
      },
      {
        property: "og:title",
        content: "CSV Viewer & Editor Online — Fast, In-Browser CSV & TSV Tool",
      },
      {
        property: "og:description",
        content:
          "Open, view, edit, search, and filter large CSV & TSV files directly in your browser with zero lag. 100% private with no server uploads.",
      },
      { property: "og:url", content: "https://csvviewer.github.io/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "CSV Viewer & Editor Online — Fast, In-Browser CSV & TSV Tool",
      },
      {
        name: "twitter:description",
        content:
          "Free online CSV viewer and editor. Open, search, sort, and filter CSV files with zero lag. 100% in-browser, no uploads.",
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
    <div className="w-full space-y-12">
      <div id="viewer">
        <CsvViewer />
      </div>
      <CsvArticle />
    </div>
  );
}
