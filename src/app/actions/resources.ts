"use server";

import { Resource } from "@/lib/utils";
import z from "zod";
import RESOURCES from "../db/resources.json";
import path from "path";
import fs from "fs/promises";

type ActionState<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function createResource(
  _: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const schema = z.object({
    resource: z.string().url("Please enter a valid URL"),
    name: z.string().optional(),
  });

  const parsed = schema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const resource: Resource = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: parsed.data.name || parsed.data.resource,
    url: parsed.data.resource,
    type: "resource",
  };

  try {
    RESOURCES.push(resource);
    const filepath = path.join(process.cwd(), "src/app/db/resources.json");
    await fs.writeFile(filepath, JSON.stringify(RESOURCES, null, 2), "utf-8");
    return { success: true };
  } catch (e: unknown) {
    return {
      success: false,
      error: (e as Error).message || "Failed to create resource",
    };
  }
}

// export async function createDocument(
//   _: CreateDocumentActionState | undefined,
//   formData: FormData,
// ): Promise<CreateDocumentActionState> {
//   const rawFormData = Object.fromEntries(formData.entries());

//   const schema = z.object({
//     name: z.string().min(1, "Document name is required"),
//   });

//   const parsed = schema.safeParse(rawFormData);

//   if (!parsed.success) {
//     return { success: false, error: parsed.error.issues[0].message };
//   }

//   const { name } = parsed.data;

//   const newDocument: Document = {
//     id: crypto.randomUUID(),
//     name,
//     content: "",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     type: "document",
//   };

//   try {
//     DOCUMENTS.push(newDocument);
//     const filePath = path.join(process.cwd(), "src/app/db/documents.json");
//     await fs.writeFile(filePath, JSON.stringify(DOCUMENTS, null, 2), "utf-8");
//     revalidatePath("/docs");
//     return { success: true, data: { documentId: newDocument.id } };
//   } catch (e: unknown) {
//     return {
//       success: false,
//       error: (e as Error).message || "Failed to create document.",
//     };
//   }
// }
