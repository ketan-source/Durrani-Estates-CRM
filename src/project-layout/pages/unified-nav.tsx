import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import type { SidebarNavItem } from "./sidebar-data";
import { cn } from "@/lib/utils";

const itemClass = (isActive: boolean) =>
  cn(
    "relative h-10 w-full rounded-none border-l-[3px] px-3.5 transition-colors",
    isActive
      ? "border-l-[#C59D33] bg-[#F5EBD4]! font-semibold text-[#C59D33]! hover:bg-[#F5EBD4]! hover:text-[#C59D33]!"
      : "border-l-transparent font-medium text-[#8A8A8A] hover:bg-[#F5EBD4]/60! hover:text-[#C59D33]!",
  );

interface UnifiedNavProps {
  items: SidebarNavItem[];
}

export function UnifiedNav({ items }: UnifiedNavProps) {
  const { pathname } = useLocation();

  return (
    <SidebarMenu className="gap-0.5">
      {items.map((item) => {
        const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
        const hasSubItems = item.items && item.items.length > 0;
        const isParentActive = hasSubItems && item.items?.some((sub) => pathname.includes(sub.url));

        if (hasSubItems) {
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isParentActive}
                    className={cn("justify-between", itemClass(!!isParentActive))}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />}
                      <span className="text-[13px]">{item.title}</span>
                    </div>
                    <ChevronDown className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className="mt-1 space-y-0.5 border-0">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname.includes(subItem.url);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isSubActive}
                            className={cn("w-full pl-8", itemClass(isSubActive))}
                          >
                            <Link to={subItem.url} className="flex items-center gap-3">
                              {subItem.icon && (
                                <subItem.icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                              )}
                              <span className="text-[13px]">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={isActive}
              className={itemClass(isActive)}
            >
              <Link to={item.url} className="flex items-center gap-3">
                {item.icon && <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />}
                <span className="text-[13px]">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
