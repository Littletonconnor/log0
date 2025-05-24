import { redirect } from "next/navigation";
import DOCUMENTS from "../../../db/documents.json";
import { EditableDocumentName } from "./editable-document-name";
import { EditableText } from "./editable-text";

interface PageProps {
  params: Promise<{ doc_id: string }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { doc_id } = await params;

  const document = DOCUMENTS.find((doc) => doc.id === doc_id);

  if (!document) {
    redirect("/404");
    return;
  }

  return (
    <div className="flex h-full justify-center p-8">
      <div className="flex h-full w-full max-w-4xl flex-col">
        <EditableDocumentName document={document} />
        <time
          dateTime={document.createdAt}
          className="text-muted-foreground text-xs mb-2"
        >
          Update at {new Date(document.createdAt).toLocaleString()}
        </time>
        <EditableText document={document} />
      </div>
    </div>
  );
}
