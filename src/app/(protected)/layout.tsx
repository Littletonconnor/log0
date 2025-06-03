import { ClientSidebar } from "@/components/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Document, Resource } from "@/lib/utils";
import DOCUMENTS from "../db/documents.json";
import RESOURCES from "../db/resources.json";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      defaultOpen={true}
      className="grid h-dvh grid-rows-[auto_1fr]"
    >
      <div className="flex row-span-2">
        <ClientSidebar
          documents={DOCUMENTS as Document[]}
          resources={RESOURCES as Resource[]}
        />
        <main className="grid flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
