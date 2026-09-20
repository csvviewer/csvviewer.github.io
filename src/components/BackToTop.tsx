import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show when scrolled down more than 400px
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        const viewerEl = document.getElementById("viewer");
        if (viewerEl) {
          viewerEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="fixed bottom-6 right-6 z-40 shadow-lg border border-border/80 bg-background/90 backdrop-blur transition-all duration-200 hover:scale-105 gap-1.5 text-xs"
      aria-label="Back to CSV Viewer"
    >
      <ArrowUp className="size-3.5" />
      <span>Back to Viewer</span>
    </Button>
  );
}
