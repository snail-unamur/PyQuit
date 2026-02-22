import { Skeleton } from "@/components/ui/skeleton";

export function NavLinkSkeleton() {
  return (
    <div className="space-y-2 px-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i + 1} className="flex items-center gap-3 p-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-30" />
        </div>
      ))}
    </div>
  );
}
