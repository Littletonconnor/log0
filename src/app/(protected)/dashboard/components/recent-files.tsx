import DOCUMENTS from "../../../db/documents.json";
import RESOURCES from "../../../db/resources.json";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

const FILES = [...DOCUMENTS, ...RESOURCES];

export function RecentFiles() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="grid divide-y divide-border">
        {FILES.map((file) => {
          return file.type === "document" ? (
            <Link
              className="group relative flex items-start gap-4 bg-background p-4 transition-colors hover:bg-muted/50"
              href={`/docs/${file.id}`}
              key={file.id}
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border/40 bg-blue-500/5 text-blue-500">
                <FileText className="w-4 h-4 transition-transform duration-400 group-hover:rotate-3 group-hover:scale-110" />
              </div>
              <div className="flex flex-col grow justify-between">
                <div className="pr-16">
                  <h3 className="max-w-96 truncate font-medium text-base">
                    {file.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {file.content?.slice(0, 200)}
                  </p>
                </div>
              </div>
              <div className="absolute right-4 bottom-4">
                <p className="text-xs text-muted-foreground">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ) : (
            <a
              className="group relative flex items-start gap-4 bg-background p-4 transition-colors hover:bg-muted/50"
              key={file.id}
              target="_blank"
              rel="noopener noreferrer"
              href={`${file.url}`}
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border/40 bg-purple-500/5 text-purple-500">
                <ExternalLink className="h-4 w-4 transition-transform duration-400 group-hover:rotate-3 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <h3 className="max-w-96 truncate font-medium text-base">
                  {file.name}
                </h3>
                <p className="max-w-96 truncate text-muted-foreground text-xs">
                  {file.url}
                </p>
              </div>
              <div className="absolute right-4 bottom-4">
                <p className="text-xs text-muted-foreground">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
