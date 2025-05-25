import DOCUMENTS from "../../../db/documents.json";
import RESOURCES from "../../../db/resources.json";

export function StatusBar() {
  const referenceCount = DOCUMENTS.length;
  const documentCount = RESOURCES.length;
  const userName = "Connor Littleton";

  return (
    <footer className="w-full border-border/40 border-t bg-background">
      <div className="flex h-8 w-full items-center justify-between px-4 text-muted-foreground text-xs">
        <div className="flex items-center gap-4">
          <span>{referenceCount} reference</span>
          <span>{documentCount} documents</span>
        </div>
        <div>{userName} • text0</div>
      </div>
    </footer>
  );
}
