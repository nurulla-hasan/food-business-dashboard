import { cn } from "@/lib/utils"
import { forwardRef } from "react";

const Skeleton = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
})

export { Skeleton }
