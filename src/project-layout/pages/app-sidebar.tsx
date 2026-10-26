"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { LogoSection } from "./logo";
import { UnifiedNav } from "./unified-nav";
import { useUserDetailStore } from "@/store/store";
import { settingsNavItem, sidebarData } from "./sidebar-data";
import userAvatar from "@/assets/user.jpg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const name = useUserDetailStore((state) => state.userDetail?.name);
  const email = useUserDetailStore((state) => state.userDetail?.email);

  const navUser = React.useMemo(
    () => ({
      name: typeof name === "string" && name ? name : "Archit Batham",
      email: typeof email === "string" && email ? email : "Agent",
      avatar: userAvatar,
    }),
    [name, email],
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#E8E8E8] bg-white font-inter"
      {...props}
    >
      <SidebarContent className="gap-0">
        <LogoSection />
        <SidebarSeparator className="mx-3 my-2 w-auto bg-[#E8E8E8]" />

        {sidebarData.map((section, index) => (
          <React.Fragment key={section.title || `section-${index}`}>
            {index > 0 && <SidebarSeparator className="mx-3 my-2 w-auto bg-[#E8E8E8]" />}
            <SidebarGroup className="px-0 py-1">
              {section.title ? (
                <SidebarGroupLabel className="h-7 px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                  {section.title}
                </SidebarGroupLabel>
              ) : null}
              <UnifiedNav items={section.items} />
            </SidebarGroup>
          </React.Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-0 border-t border-[#E8E8E8] p-0">
        <SidebarGroup className="px-0 py-1">
          <UnifiedNav items={[settingsNavItem]} />
        </SidebarGroup>
        <SidebarSeparator className="mx-3 my-1 w-auto bg-[#E8E8E8]" />
        <div className="px-2 pb-3 pt-1">
          <NavUser user={navUser} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
