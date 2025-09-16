import { Skeleton } from "@/components/ui/skeleton";

const LegalEditorSkeleton = () => {
  return (
    <div className="shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-4">
      {/* Toolbar Skeleton */}
      <div className="h-14 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-center gap-2 flex-wrap">
        {Array.from({ length: 18 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-7 w-8 rounded bg-gray-300 dark:bg-gray-700`}
          />
        ))}
      </div>

      {/* Editor Content Skeleton */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900" style={{ minHeight: "568px" }}>
          <Skeleton className="h-4 w-2/3 mb-4 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-full mb-4 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-5/6 mb-4 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-full mb-4 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-4/5 mb-4 rounded bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Footer Skeleton */}
      <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-b-lg flex justify-end text-[10px] text-muted-foreground">
        <span className="mr-4">CHARS: —</span>
        <span className="mr-4">WORDS: —</span>
        <span>POWERED BY JODIT</span>
      </div>
    </div>
  );
};

export default LegalEditorSkeleton;