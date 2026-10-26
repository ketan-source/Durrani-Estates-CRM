import { ChevronLeft } from "lucide-react";
import { SidebarGroup, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import durraniLogoFull from "@/assets/durrani-logo-full.png";
import durraniIcon from "@/assets/durrani-icon.png";

export function LogoSection() {
  const { toggleSidebar, state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarGroup className="px-3 pt-4 pb-3">
      <div
        className={cn(
          "flex items-center gap-2",
          collapsed ? "justify-center px-0" : "justify-between px-0.5",
        )}
      >
        <button
          type="button"
          onClick={collapsed ? toggleSidebar : undefined}
          className="flex min-w-0 items-center text-left"
          aria-label={collapsed ? "Expand sidebar" : "Durrani Estates"}
        >
          {collapsed ? (
            <img
              src={durraniIcon}
              alt="Durrani Estates"
              className="size-9 shrink-0 object-contain"
            />
          ) : (
            <img
              src={durraniLogoFull}
              alt="Durrani Estates"
              className="h-10 w-auto max-w-[160px] object-contain object-left"
            />
          )}
        </button>

        {!collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F5EBD4] text-[#C59D33] transition-colors hover:bg-[#EFE0BC]"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </SidebarGroup>
  );
}
