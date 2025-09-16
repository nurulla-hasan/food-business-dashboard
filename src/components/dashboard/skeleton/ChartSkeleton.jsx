
import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-44" />
            </div>
            <Skeleton className="h-[300px] w-full" />
        </div>
    );
};

export default ChartSkeleton;
