import { Log0Logo } from "@/components/icons/log0-logo";

export function AppHeader() {
  return (
    <div className="mb-8 flex items-start justify-start gap-4">
      <div className="bg-foreground rounded-sm">
        <Log0Logo className="h-14 w-14 text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        {/* TODO: TextScramble */}
        <h1 className="font-semibold text-2xl lowercase tracking-tight font-mono">
          Log0
        </h1>
        <p className="text-sm text-muted-foreground">
          Your documents and resources, all in one place.
        </p>
      </div>
    </div>
  );
}
