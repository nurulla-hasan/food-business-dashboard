
import { Skeleton } from "@/components/ui/skeleton";

const AudioDistributionChartSkeleton = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center justify-center">
                <Skeleton className="h-48 w-48 rounded-full" />
            </div>
            <div className="mt-4 space-y-2">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Skeleton className="h-3 w-3 rounded-full mr-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center">
                            <Skeleton className="h-4 w-12 mr-2" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioDistributionChartSkeleton;
