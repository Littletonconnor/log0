import { Editor } from "@/components/editor";
import { type Document } from "@/lib/utils";
import { redirect } from "next/navigation";
import DOCUMENTS from "../../../db/documents.json";

interface PageProps {
  params: Promise<{ doc_id: string }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { doc_id } = await params;

  const document = DOCUMENTS.find(
    (doc) => doc.id === doc_id,
  ) as unknown as Document;

  if (!document) {
    redirect("/404");
    return null;
  }

  return (
    <div className="flex h-full justify-center p-8">
      <Editor document={document} />
    </div>
  );
}
