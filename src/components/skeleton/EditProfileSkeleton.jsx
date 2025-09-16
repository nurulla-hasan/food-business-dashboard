import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const EditProfileSkeleton = () => {
    return (
        <Card>
            <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Personal Information */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" /> {/* Label */}
                            <Skeleton className="h-8 w-full rounded-md" /> {/* Input */}
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Email Address */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" /> {/* Label */}
                        <Skeleton className="h-8 w-full rounded-md" /> {/* Input */}
                    </div>
                </section>

                <Separator />

                {/* Contact Information */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" /> {/* Label */}
                            <Skeleton className="h-8 w-full rounded-md" /> {/* Input */}
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" /> {/* Label */}
                            <Skeleton className="h-8 w-full rounded-md" /> {/* Input */}
                        </div>
                    </div>
                </section>

                {/* Submit button */}
                <div className="pt-2">
                    <Skeleton className="h-8 w-full rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}

export default EditProfileSkeleton
