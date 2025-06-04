"use client";

import { updateDocumentContent } from "@/app/actions/docs";
import { type Document } from "@/lib/utils";
import * as React from "react";

interface EditableTextProps {
  document: Document;
}

export function EditableTextArea({ document }: EditableTextProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = React.useState(document.content);
  const [, formAction] = React.useActionState(updateDocumentContent, undefined);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      buttonRef.current?.click();
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <form className="h-full" action={formAction}>
      <input type="hidden" name="id" value={document.id} />
      <textarea
        ref={textareaRef}
        name="content"
        className="h-[calc(100%-2rem)] w-full flex-1 resize-none whitespace-pre-wrap bg-transparent font-serif text-base outline-none placeholder:text-muted-foreground/50"
        onKeyDown={handleKeyDown}
        onChange={handleInput}
        value={input}
        style={{
          caretColor: "var(--primary)",
        }}
      />
      <button ref={buttonRef} className="hidden" type="submit"></button>
    </form>
  );
}
