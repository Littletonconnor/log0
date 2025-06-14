"use client";

import * as React from "react";
import { type Document } from "@/lib/utils";
import { EditableDocumentName } from "./document-name";
import { EditableTextArea } from "./textarea";
import { EditableToolbar } from "./toolbar";

interface EditorProps {
  document: Document;
}

export function Editor({ document }: EditorProps) {
  return (
    <div className="relative flex h-full w-full max-w-4xl flex-col">
      <EditableDocumentName document={document} />
      <time
        dateTime={document.updatedAt}
        className="text-muted-foreground text-xs mb-2"
      >
        Updated at {new Date(document.updatedAt).toLocaleString()}
      </time>
      <EditableTextArea document={document} />
      <EditableToolbar />
    </div>
  );
}
