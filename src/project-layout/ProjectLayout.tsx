import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./pages/app-sidebar";
import { Outlet, useLocation } from "react-router";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/dashboard": "Admin Dashboard",
  "/leads": "Lead",
  "/lead-import": "Lead Import",
  "/assignments": "Assignments",
  "/people-teams": "People & Teams",
  "/projects-properties": "Projects & Properties",
  "/bookings-approval": "Bookings & Approval",
  "/secondary-market": "Secondary Market",
  "/convertible-notes": "Convertible Notes",
  "/commission": "Commission",
  "/hr-attendance": "HR & Attendance",
  "/report-mis": "Report & MIS",
  "/audit-log": "Audit Log",
  "/settings": "Settings",
};

export default function Page() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Durrani Estates";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList className="gap-1.5 text-sm font-medium text-gray-900">
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-900">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-[#C59D33]/10">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold leading-none text-white">
                2
              </span>
            </Button>
          </div>
        </header>
        <div
          id="outlet-area"
          className="relative min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
