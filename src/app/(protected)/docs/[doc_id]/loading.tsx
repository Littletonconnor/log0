import { Skeleton } from "@/components/ui/skeleton";

export default function DocLoading() {
  return (
    <div className="flex h-full justify-center p-8">
      <div className="relative flex h-full w-full max-w-4xl flex-col">
        <Skeleton className="mb-6 h-10 w-2/3" />
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="mb-2 h-4 w-1/3" />
        ))}
      </div>
    </div>
  );
}
