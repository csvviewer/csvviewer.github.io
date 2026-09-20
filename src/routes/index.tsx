import { createFileRoute } from "@tanstack/react-router";
import { CsvViewer } from "@/components/csv/CsvViewer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSV Viewer — Fast, In-Browser CSV Tool" },
      {
        name: "description",
        content:
          "Fast, in-browser CSV & TSV viewer and editor with zero-lag virtualized scrolling, instant search, column filters, stats, and multi-format export. Files never leave your device.",
      },
      { property: "og:title", content: "CSV Viewer — Fast, In-Browser CSV Tool" },
      {
        property: "og:description",
        content:
          "View, search, filter, and edit large CSV files directly in your browser. Handles 100k+ rows effortlessly with 100% client-side privacy.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="w-full">
      <CsvViewer />
    </div>
  );
}
