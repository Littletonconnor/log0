"use client";

import { createDocument, deleteDocument } from "@/app/actions/docs";
import { useIsClicked } from "@/hooks/use-boolean";
import { Document, Resource } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  LayoutGrid,
  Loader2,
  MoreHorizontal,
  PanelRight,
  Plus,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { GlobalSearch } from "./global-search";
import { Log0Logo } from "./icons/log0-logo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from "./ui/sidebar";

interface ClientSidebarProps {
  documents: Document[];
  resources: Resource[];
}
export function ClientSidebar({ documents, resources }: ClientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [documentName, setDocumentName] = React.useState("");
  const { clicked, setIsClicked } = useIsClicked();
  const [isDocumentDeletePending, startDocumentDeleteTransition] =
    React.useTransition();
  const [state, formAction, isCreatingDocument] = React.useActionState(
    createDocument,
    undefined,
  );

  React.useEffect(() => {
    console.log("State", state);
    if (state?.success) {
      toast.success("Document created successfully");
      router.push(`/docs/${state.data?.documentId}`);
      setDocumentName("");
      setIsClicked();
    }
  }, [state, router]);

  const handleDeleteDocument = async (documentId: string) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    startDocumentDeleteTransition(async () => {
      const result = await deleteDocument(documentId);
      if (result.success) {
        toast.success(`Document successfully deleted`);
        if (pathname === `/docs/${documentId}`) {
          router.push("/dashboard");
        }
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

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
                      className="flex w-full items-center data-[state=open]:pr-2"
                      tooltip="My documents"
                    >
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      <span>My documents</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:px-0">
                      {/* Create document input */}
                      <SidebarMenuItem>
                        {clicked ? (
                          <form
                            action={formAction}
                            className="relative group-data-[collapsible=icon]:hidden"
                          >
                            <SidebarMenuButton asChild>
                              <Input
                                className="pr-6"
                                onChange={(e) =>
                                  setDocumentName(e.target.value)
                                }
                                value={documentName}
                                name="name"
                                autoFocus
                                disabled={isCreatingDocument}
                                placeholder="document name"
                              />
                            </SidebarMenuButton>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setDocumentName("");
                              }}
                              disabled={isCreatingDocument}
                              className="absolute right-2 top-1/2 -translate-y-1/2 group-data-[collapsible=icon]:hidden disabled:opacity-50"
                            >
                              {isCreatingDocument ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <X className="size-4" />
                              )}
                            </button>
                          </form>
                        ) : (
                          <SidebarMenuButton asChild>
                            <Button
                              className="w-full justify-start group-data-[collapsible=icon]:hidden"
                              onClick={setIsClicked}
                              variant="outline"
                            >
                              <span>
                                <Plus className="size-4" />
                              </span>
                              <span>New document</span>
                            </Button>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                      {documents.map((document) => (
                        <SidebarMenuItem key={document.id}>
                          <SidebarMenuButton asChild tooltip={document.name}>
                            <Link
                              className="flex items-center"
                              href={`/docs/${document.id}`}
                            >
                              <span>
                                <FileText className="size-4 shrink-0" />
                              </span>
                              <span className="truncate max-w-52">
                                {document.name}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuAction>
                                <MoreHorizontal className="size-4" />
                              </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                  <span>
                                    <Download className="size-4" />
                                  </span>
                                  Export markdown
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteDocument(document.id)
                                  }
                                  disabled={isDocumentDeletePending}
                                  className="cursor-pointer flex items-center gap-2"
                                >
                                  <span>
                                    {isDocumentDeletePending ? (
                                      <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                      <Trash className="size-4" />
                                    )}
                                  </span>
                                  Delete document
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* === Resources section === */}
              <Collapsible defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="flex w-full items-center data-[state=open]:px-2"
                      tooltip="My resources"
                    >
                      <FolderOpen className="size-4 shrink-0" />
                      <span>My resources</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:px-0">
                      {resources.map((resource) => (
                        <SidebarMenuItem key={resource.id}>
                          <SidebarMenuButton asChild tooltip={resource.name}>
                            <a href={resource.url} target="_blank">
                              <span>
                                <ExternalLink className="size-4" />
                              </span>
                              <span>{resource.name}</span>
                            </a>
                          </SidebarMenuButton>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuAction>
                                <MoreHorizontal className="size-4" />
                              </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuGroup>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                  <span>
                                    <Trash className="size-4" />
                                  </span>
                                  Delete resource
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* === Log-in/log-out buttons === */}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}
