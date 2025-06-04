import { redirect } from "next/navigation";
import DOCUMENTS from "../../../db/documents.json";
import { EditableDocumentName } from "./editable-document-name";
import { EditableText } from "./editable-text";
import { EditorToolbar } from "./editor-toolbar";

interface PageProps {
  params: Promise<{ doc_id: string }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { doc_id } = await params;

  const document = DOCUMENTS.find((doc) => doc.id === doc_id);

  if (!document) {
    redirect("/404");
    return null;
  }

  return (
    <div className="flex h-full justify-center p-8">
      <div className="relative flex h-full w-full max-w-4xl flex-col">
        <EditableDocumentName document={document} />
        <time
          dateTime={document.updatedAt}
          className="text-muted-foreground text-xs mb-2"
        >
          Updated at {new Date(document.updatedAt).toLocaleString()}
        </time>
        <EditableText document={document} />
        <EditorToolbar />
      </div>
    </div>
  );
}
