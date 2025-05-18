"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  return (
    <>
      <SidebarMenuButton
        variant="outline"
        tooltip="Search documents and resources"
        size="default"
        onClick={() => setOpen(true)}
        className={cn(
          "h-9 relative flex w-full items-center justify-between border border-border px-2 text-muted-foreground text-sm",
        )}
      >
        <span className="inline-flex w-full items-center justify-between group-data-[collapsible=icon]:justify-center">
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="group-data-[collapsible=icon]:hidden">
              Search or press
            </span>
          </span>
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-foreground group-data-[collapsible=icon]:hidden sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </span>
      </SidebarMenuButton>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Globally search all documents and references" />
        <CommandList>
          {/* TODO: Create new document button */}
          {/* TODO: Create new reference button */}
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {/* Grab 5 most recently updated documents */}
            <CommandItem>Documents</CommandItem>
          </CommandGroup>
          <CommandGroup heading="References">
            {/* Grab 5 most recently updated references */}
            <CommandItem>References</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
