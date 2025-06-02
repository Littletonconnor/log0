"use server";

import type { ActionState, Document } from "@/lib/utils";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import { z } from "zod";
import DOCUMENTS from "../db/documents.json";

type CreateDocumentActionState = ActionState<
  {
    name: string;
  },
  {
    documentId: string;
  }
>;
type UpdateDocumentActionState = ActionState<
  {
    name: string;
  },
  {
    documentId: string;
  }
>;

export async function updateDocumentName(
  prevState: UpdateDocumentActionState | undefined,
  formData: FormData,
): Promise<UpdateDocumentActionState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const formSchema = z.object({
    name: z.string().min(1, "Document name is required"),
    id: z.string(),
  });

  const parsed = formSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { id } = parsed.data;

  const documentIndex = DOCUMENTS.findIndex((doc) => doc.id === id);
  if (documentIndex === -1) {
    return { success: false, error: "Document not found" };
  }

  try {
    DOCUMENTS[documentIndex].name = parsed.data.name;
    DOCUMENTS[documentIndex].updatedAt = new Date().toISOString();
    const filePath = path.join(process.cwd(), "src/app/db/documents.json");
    await fs.writeFile(filePath, JSON.stringify(DOCUMENTS, null, 2), "utf8");
    revalidatePath(`/docs/${id}`);
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to update document name.",
    };
  }
}

export async function updateDocumentContent(
  _: CreateDocumentActionState | undefined,
  formData: FormData,
): Promise<CreateDocumentActionState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const schema = z.object({
    id: z.string(),
    content: z.string(),
  });

  const parsed = schema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { id, content } = parsed.data;

  const documentIndex = DOCUMENTS.findIndex((doc) => doc.id === id);
  if (documentIndex === -1) {
    return { success: false, error: "Document not found" };
  }

  try {
    DOCUMENTS[documentIndex].content = content;
    DOCUMENTS[documentIndex].createdAt = new Date().toISOString();
    const filepath = path.join(process.cwd(), "src/app/db/documents.json");
    await fs.writeFile(filepath, JSON.stringify(DOCUMENTS, null, 2), "utf-8");
    revalidatePath(`/docs/${id}`);
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to update document content.",
    };
  }
}

export async function createDocument(
  _: CreateDocumentActionState | undefined,
  formData: FormData,
): Promise<CreateDocumentActionState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const schema = z.object({
    name: z.string().min(1, "Document name is required"),
  });

  const parsed = schema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name } = parsed.data;

  const newDocument: Document = {
    id: crypto.randomUUID(),
    name,
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: "document",
  };

  try {
    DOCUMENTS.push(newDocument);
    const filePath = path.join(process.cwd(), "src/app/db/documents.json");
    await fs.writeFile(filePath, JSON.stringify(DOCUMENTS, null, 2), "utf-8");
    revalidatePath("/docs");
    return { success: true, data: { documentId: newDocument.id } };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to create document.",
    };
  }
}

type DeleteDocumentResult = {
  success: boolean;
  error?: string;
};

export async function deleteDocument(
  id: string,
): Promise<DeleteDocumentResult> {
  const documentIndex = DOCUMENTS.findIndex((d) => d.id === id);

  if (documentIndex === -1) {
    return { success: false };
  }

  try {
    DOCUMENTS.splice(documentIndex, 1);
    const filePath = path.join(process.cwd(), "src/app/db/documents.json");
    await fs.writeFile(filePath, JSON.stringify(DOCUMENTS, null, 2), "utf-8");

    revalidatePath("/dashboard");
    revalidatePath("/docs");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to delete document.",
    };
  }
}
