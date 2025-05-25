"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Focus, Sparkles } from "lucide-react";
import * as React from "react";

export function EditorToolbar() {
  const [isAutocompleteToggled, setIsAutocompleteToggled] =
    React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        const bodyTag = document.querySelector("body");
        if (bodyTag) {
          const zen = bodyTag.dataset.zen;
          bodyTag.dataset.zen = zen === "off" ? "on" : !zen ? "on" : "off";
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 max-w-98 bottom-0 w-full flex items-center justify-center px-4 z-10 group-data-[zen=on]:hidden">
      <div className="flex w-full flex-col items-center justify-center rounded-lg border bg-background/80 shadow-sm backdrop-blur-sm">
        <div className="flex w-full items-center justify-center gap-2 px-4 py-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Toggle
                  id="autocomplete"
                  aria-label="Toggle AI autocomplete"
                  variant="outline"
                  key={isAutocompleteToggled ? "on" : "off"}
                  pressed={isAutocompleteToggled}
                  onPressedChange={setIsAutocompleteToggled}
                  className="size-8 hover:bg-foreground/10 data-[state=on]:hover:bg-foreground/10"
                >
                  <Sparkles className="size-4" />
                </Toggle>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle AI autocomplete</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  id="zen-mode"
                  aria-label="Toggle Zen Mode"
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    const bodyTag = document.querySelector("body");
                    if (bodyTag) {
                      const zen = bodyTag.dataset.zen;
                      bodyTag.dataset.zen =
                        zen === "off" ? "on" : !zen ? "on" : "off";
                    }
                  }}
                  className="size-8 hover:bg-foreground/10 data-[state=on]:hover:bg-foreground/10"
                >
                  <Focus className="size-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                <kbd className="inline-flex h-5 max-h-full items-center rounded border bg-muted px-1 font-medium font-mono text-[0.625rem] text-foreground">
                  ⌘J
                </kbd>{" "}
                Toggle Zen mode
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
