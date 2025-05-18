export function StatusBar() {
  // TODO: make these dynamic
  const referenceCount = 1;
  const documentCount = 2;
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
