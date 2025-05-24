import type { ActionState } from "@/lib/utils";
import { z } from "zod";

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
    pathname: z.string(),
  });

  const parsed = formSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  return Promise.resolve({ name: "Connor", success: true });
}
