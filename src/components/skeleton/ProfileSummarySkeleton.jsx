import { Skeleton } from "@/components/ui/skeleton";

const ProfileSummarySkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="relative">
        <Skeleton className="h-20 w-20 rounded-full border" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Skeleton className="h-4 w-32 mb-1" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

export default ProfileSummarySkeleton;