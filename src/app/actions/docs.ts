"use server";

import type { ActionState } from "@/lib/utils";
import fs from "fs/promises";
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

export async function updateDocumentName(
  prevState: CreateDocumentActionState | undefined,
  formData: FormData,
): Promise<CreateDocumentActionState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const formSchema = z.object({
    name: z.string().min(1, "Document name is required"),
    id: z.string(),
  });

  const parsed = formSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { id } = parsed.data;

  const documentIndex = DOCUMENTS.findIndex((doc) => doc.id === id);
  if (documentIndex === -1) {
    return { success: false, error: "Document not found" };
  }

  try {
    DOCUMENTS[documentIndex].name = parsed.data.name;
    const filePath = path.join(process.cwd(), "src/app/db/documents.json");
    await fs.writeFile(filePath, JSON.stringify(DOCUMENTS, null, 2), "utf8");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to update document name",
    };
  }
}
