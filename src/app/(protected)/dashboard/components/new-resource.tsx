"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { QuickActionButton } from "./quick-action-button";
import { createResource } from "@/app/actions/resources";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

export function NewResource() {
  const [open, setOpen] = React.useState(false);

  const [state, formAction, isPending] = React.useActionState(
    createResource,
    undefined,
  );

  React.useEffect(() => {
    if (state?.success) {
      setOpen(!open);
    }
  }, [open, state]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <QuickActionButton iconName="Brain" label="New Resource">
          <span className="hidden md:block">New Resource</span>
          <span className="block md:hidden">New Res</span>
        </QuickActionButton>
      </DialogTrigger>
      <NewResourceDialog
        error={state?.error}
        isPending={isPending}
        formAction={formAction}
      />
    </Dialog>
  );
}

function NewResourceDialog({
  error,
  isPending,
  formAction,
}: {
  error?: string;
  isPending: boolean;
  formAction: (payload: FormData) => void;
}) {
  return (
    <DialogContent>
      <DialogTitle>Add a new Resource</DialogTitle>
      <form action={formAction} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="resource">Resource Name</Label>
          <Input
            name="resource"
            placeholder="https://www.google.com"
            disabled={isPending}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="name">Name (replacement for URL)</Label>
          <Input name="name" placeholder="Resource Name" disabled={isPending} />
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
          Add Resource
        </Button>
      </form>
    </DialogContent>
  );
}
