"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Check, Replace } from "lucide-react";
import * as React from "react";

interface EditableFindReplaceProps {
  onSearch: (search: string) => void;
  onReplace: (replace: string) => void;
}

export function EditableFindReplace({
  onSearch,
  onReplace,
}: EditableFindReplaceProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFindAndReplaceOpen, setIsFindAndReplaceOpen] = React.useState(false);

  React.useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
      }
    };

    window.addEventListener("keydown", keydownListener);

    return () => {
      window.removeEventListener("keydown", keydownListener);
    };
  }, []);

  React.useEffect(() => {
    const ref = editorRef?.current;
    if (ref) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      ref.addEventListener("keydown", handleKeyDown);

      return () => {
        ref.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleOnReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    onReplace(e.target.value);
  };

  return (
    <div
      ref={editorRef}
      data-slot="editor-find-replace"
      className={cn(
        "absolute right-0 max-w-64 top-0 w-full z-50 flex items-center justify-center",
        isOpen ? "block" : "hidden",
      )}
    >
      <div className="flex w-full flex-col items-center justify-center rounded-lg border bg-background/80 shadow-sm">
        <div className="flex w-full items-center justify-center gap-2 px-4 py-2">
          <Input placeholder="Find..." onChange={handleOnSearch} />
          <Toggle
            id="findAndReplace"
            aria-label="Toggle Replace and Replace"
            variant="outline"
            key={isFindAndReplaceOpen ? "on" : "off"}
            pressed={isFindAndReplaceOpen}
            onPressedChange={setIsFindAndReplaceOpen}
            className="size-8 hover:bg-foreground/10 data-[state=on]:hover:bg-foreground/10"
          >
            <Replace className="size-4" />
          </Toggle>
        </div>
        {isFindAndReplaceOpen && (
          <div className="flex w-full items-center justify-center gap-2 px-4 py-2">
            <Input placeholder="Replace..." onChange={handleOnReplace} />
            <Button variant="outline" size="icon">
              <Check />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
