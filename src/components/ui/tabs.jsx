import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, variant = "pill", ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        variant === "line"
          ? "inline-flex h-10 w-full items-center gap-1 overflow-x-auto overflow-y-hidden border-b [scrollbar-width:none]"
          : "bg-muted text-muted-foreground inline-flex h-9 w-fit max-w-full items-center justify-center overflow-x-auto rounded-lg p-[3px] [scrollbar-width:none]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] outline-none cursor-pointer focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "in-data-[variant=pill]:h-[calc(100%-1px)] in-data-[variant=pill]:flex-1 in-data-[variant=pill]:rounded-md in-data-[variant=pill]:border in-data-[variant=pill]:border-transparent in-data-[variant=pill]:px-3 in-data-[variant=pill]:py-1 in-data-[variant=pill]:text-muted-foreground in-data-[variant=pill]:data-[state=active]:bg-background in-data-[variant=pill]:data-[state=active]:text-foreground in-data-[variant=pill]:data-[state=active]:shadow-sm",
        "in-data-[variant=line]:h-10 in-data-[variant=line]:rounded-none in-data-[variant=line]:border-b-2 in-data-[variant=line]:border-transparent in-data-[variant=line]:px-3 in-data-[variant=line]:text-muted-foreground in-data-[variant=line]:data-[state=active]:border-primary in-data-[variant=line]:data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
