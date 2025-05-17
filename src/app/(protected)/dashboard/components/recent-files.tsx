import { FileText } from "lucide-react";
import Link from "next/link";

const FILES = [
  {
    name: "File 1",
    id: "1",
    createdAt: "2023-10-01",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "document",
  },
  {
    name: "A Really long file name that should go on and on and on and on and on and on and on and on and on",
    id: "2",
    createdAt: "2023-10-02",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "document",
  },
  {
    name: "Resource 1",
    id: "3",
    url: "https://wealthfront.com",
    createdAt: "2023-10-03",
    type: "resource",
  },
];

export function RecentFiles() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="grid divide-y divide-border">
        {FILES.map((file) => {
          return file.type === "document" ? (
            <Link
              className="group relative flex items-start gap-4 bg-background p-4 transition-colors hover:bg-muted/50"
              href={`/documents/${file.id}`}
              key={file.id}
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border/40 bg-blue-500/5 text-blue-500">
                <div className="flex items-center justify-center">
                  <FileText className="w-4 h-4 transition-transform duration-400 group-hover:rotate-3 group-hover:scale-110" />
                </div>
              </div>
              <div className="flex flex-col grow justify-between">
                <div className="pr-16">
                  <h3 className="max-w-[400px] truncate font-medium text-base">
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
            <div key={file.id}>I am a resource</div>
          );
        })}
      </div>
    </div>
  );
}
