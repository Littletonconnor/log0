"use client";
import { updateDocumentName } from "@/app/actions/docs";
import { Input } from "@/components/ui/input";
import DOCUMENTS from "../../../db/documents.json";
import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EditableDocumentNameProps {
  document: (typeof DOCUMENTS)[0];
}

export function EditableDocumentName({ document }: EditableDocumentNameProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [state, formAction, isPending] = React.useActionState(
    updateDocumentName,
    undefined,
  );

  React.useEffect(() => {
    if (state?.success) {
      toast.success("Document name updated");
    } else if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <form className="mb-2" action={formAction} aria-label="Edit Document Name">
      <input type="hidden" name="id" value={document.id} />
      <Input
        aria-label="Document name"
        defaultValue={document.name}
        name="name"
        onKeyDown={handleKeyDown}
        disabled={isPending}
        aria-disabled={isPending}
        className={cn(
          "!text-2xl h-8 border-none bg-transparent p-0 font-semibold focus-visible:ring-0",
        )}
      />
      <button
        ref={buttonRef}
        disabled={isPending}
        type="submit"
        className="hidden"
        aria-label="Save document name"
      >
        Save
      </button>
    </form>
  );
}
