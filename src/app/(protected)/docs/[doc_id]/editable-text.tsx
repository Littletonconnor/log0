"use client";

import { updateDocumentContent } from "@/app/actions/docs";
import * as React from "react";
import DOCUMENTS from "../../../db/documents.json";

interface EditableTextProps {
  document: (typeof DOCUMENTS)[0];
}

export function EditableText({ document }: EditableTextProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);
  const [, formAction] = React.useActionState(updateDocumentContent, undefined);

  const handleOnChange = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      buttonRef.current?.click();
    }, 2000);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <form className="h-full" action={formAction}>
      <input type="hidden" name="id" value={document.id} />
      <textarea
        name="content"
        className="h-[calc(100%-2rem)] w-full flex-1 resize-none whitespace-pre-wrap bg-transparent font-serif text-base outline-none placeholder:text-muted-foreground/50"
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        defaultValue={document.content}
        style={{
          caretColor: "var(--primary)",
        }}
      />
      <button ref={buttonRef} className="hidden" type="submit"></button>
    </form>
  );
}
