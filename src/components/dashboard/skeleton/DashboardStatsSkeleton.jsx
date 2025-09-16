
import { Skeleton } from "@/components/ui/skeleton";

const DashboardStatsSkeleton = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="p-6 rounded-lg shadow-lg bg-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStatsSkeleton;
