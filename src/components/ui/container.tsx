
import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to add border to the container
   * @default true
   */
  bordered?: boolean;
  /**
   * The maximum width of the container
   * @default "max-w-7xl"
   */
  maxWidth?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, bordered = true, maxWidth = "max-w-7xl", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        maxWidth,
        bordered && "border-x border-gray-200/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = "Container";

export { Container };
