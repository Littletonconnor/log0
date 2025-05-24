"use client";

import * as React from "react";
import DOCUMENTS from "../../../db/documents.json";

interface EditableTextProps {
  document: (typeof DOCUMENTS)[0];
}

export function EditableText({ document }: EditableTextProps) {
  const [input, setInput] = React.useState(document.content);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <div className="h-full">
      <textarea
        className="h-[calc(100%-2rem)] w-full flex-1 resize-none whitespace-pre-wrap bg-transparent font-serif text-base outline-none placeholder:text-muted-foreground/50"
        value={input}
        onChange={handleOnChange}
        style={{
          caretColor: "var(--primary)",
        }}
      />
    </div>
  );
}
