"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuickActionButton } from "./quick-action-button";
import { createDocument } from "@/app/actions/docs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function NewDocument() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const [state, formAction, isPending] = React.useActionState(
    createDocument,
    undefined,
  );

  React.useEffect(() => {
    if (state?.success) {
      setOpen(false);
      router.push(`/docs/${state.data?.documentId}`);
    } else {
      setOpen(true);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <QuickActionButton
          onClick={() => setOpen(true)}
          iconName="FileText"
          label="New Document"
        >
          <span className="hidden md:block">New Document</span>
          <span className="block md:hidden">New Doc</span>
        </QuickActionButton>
      </DialogTrigger>
      <NewDocumentDialog
        error={state?.error}
        isPending={isPending}
        formAction={formAction}
      />
    </Dialog>
  );
}

interface NewDocumentDialogProps {
  error?: string;
  isPending: boolean;
  formAction: (payload: FormData) => void;
}

function NewDocumentDialog({
  error,
  isPending,
  formAction,
}: NewDocumentDialogProps) {
  return (
    <DialogContent>
      <DialogTitle>New Document</DialogTitle>
      <DialogDescription>
        Create a new document to start writing.
      </DialogDescription>

      <form className="flex flex-col gap-4" action={formAction}>
        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="name">New Document</Label>
          <Input name="name" disabled={isPending} />
        </fieldset>

        {error && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircleIcon className="size-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <Button
          variant="outline"
          type="submit"
          disabled={isPending}
          className="mt-4"
        >
          Add Document
        </Button>
      </form>
    </DialogContent>
  );
}
