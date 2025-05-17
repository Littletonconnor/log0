import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from "./ui/sidebar";
import Link from "next/link";
import { Log0Logo } from "./icons/log0-logo";
import { PanelRight } from "lucide-react";

export function ClientSidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="relative flex h-full flex-col border border-r text-foreground"
      >
        <SidebarHeader className="flex w-full flex-row justify-between group-data-[collapsible=icon]:flex-col">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Log0Logo className="w-8 h-8 rounded-sm" />
              <span className="font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                Log0
              </span>
            </Link>
          </div>
          <SidebarMenuButton
            tooltip="Toggle Sidebar"
            className="flex h-8 w-8 items-center justify-center"
            asChild
          >
            <SidebarTrigger>
              <PanelRight className="w-4 h-4" />
            </SidebarTrigger>
          </SidebarMenuButton>
        </SidebarHeader>
      </Sidebar>
    </TooltipProvider>
  );
}
