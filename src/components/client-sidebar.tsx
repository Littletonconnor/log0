"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  ChevronRight,
  FilePlus,
  FolderOpen,
  File,
  LayoutGrid,
  PanelRight,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobalSearch } from "./global-search";
import { Log0Logo } from "./icons/log0-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { DOCUMENTS, RESOURCES } from "@/lib/constants";

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="relative flex h-full flex-col border border-r text-foreground"
      >
        {/* Sidebar header */}
        <SidebarHeader className="flex w-full flex-row justify-between group-data-[collapsible=icon]:flex-col">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-foreground rounded-sm">
                <Log0Logo className="w-8 h-8 rounded-sm" />
              </div>
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

        {/* Sidebar content */}
        <SidebarContent>
          {/* Global search command menu */}
          <SidebarGroup className="relative">
            <GlobalSearch />
          </SidebarGroup>

          <SidebarGroup>
            <SidebarMenu>
              {/* Dashboard link */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link
                    href="/dashboard"
                    data-active={pathname === "/dashboard"}
                    className="flex items-center gap-2 text-muted-foreground group-data-[collapsible=icon]:justify-center"
                  >
                    <LayoutGrid className="w-4 h-4 shrink-0" />
                    <span className="truncate max-w-28 group-data-[collapsible=icon]:hidden">
                      Dashboard
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Documents section */}
              <Collapsible asChild defaultOpen className="w-full">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="flex w-full items-center"
                      tooltip="My documents"
                    >
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      <span>My documents</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {DOCUMENTS.map((document) => (
                        <SidebarMenuSubItem key={document.id}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              className="flex items-center"
                              href={`docs/${document.id}`}
                            >
                              <span>
                                <FileText className="size-4 shrink-0" />
                              </span>
                              <span className="truncate max-w-52">
                                {document.name}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Resources section */}
              <Collapsible defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="flex w-full items-center"
                      tooltip="My resources"
                    >
                      <FolderOpen className="size-4 shrink-0" />
                      <span>My resources</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {RESOURCES.map((resource) => (
                        <SidebarMenuSubItem key={resource.id}>
                          <SidebarMenuSubButton asChild>
                            <a href={resource.url} target="_blank">
                              <span>
                                <ExternalLink className="size-4" />
                              </span>
                              <span>{resource.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Log-in/log-out buttons */}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}
