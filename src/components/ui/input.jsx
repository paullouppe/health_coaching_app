import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, icon: Icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center w-full rounded-md border border-input bg-transparent shadow-sm transition-colors",
          className
        )}
      >
        {typeof Icon === 'function' && iconPosition === 'left' && (
          <div className="pl-3">
            <Icon />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex-1 h-9 rounded-md bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            iconPosition === 'left' ? 'pl-8' : 'pr-8', // Adjust padding based on icon position
            className
          )}
          ref={ref}
          {...props}
        />
        {typeof Icon === 'function' && iconPosition === 'right' && (
          <div className="pr-3">
            <Icon />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
