import {
  LayoutGrid,
  User,
  HardDriveUpload,
  UserPlus,
  Users,
  Building2,
  FileText,
  Store,
  ClipboardList,
  Percent,
  CalendarDays,
  LineChart,
  History,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export interface SidebarNavSection {
  title: string;
  items: SidebarNavItem[];
}

export const sidebarData: SidebarNavSection[] = [
  {
    title: "",
    items: [
      { title: "Home Dashboard", url: "/dashboard", icon: LayoutGrid },
      { title: "Lead", url: "/leads", icon: User },
      { title: "Lead Import", url: "/lead-import", icon: HardDriveUpload },
      { title: "Assignments", url: "/assignments", icon: UserPlus },
    ],
  },
  {
    title: "People & Sales",
    items: [
      { title: "People & Teams", url: "/people-teams", icon: Users },
      { title: "Projects & Properties", url: "/projects-properties", icon: Building2 },
      { title: "Bookings & Approval", url: "/bookings-approval", icon: FileText },
      { title: "Secondary Market", url: "/secondary-market", icon: Store },
      { title: "Convertible Notes", url: "/convertible-notes", icon: ClipboardList },
      { title: "Commission", url: "/commission", icon: Percent },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "HR & Attendance", url: "/hr-attendance", icon: CalendarDays },
      { title: "Report & MIS", url: "/report-mis", icon: LineChart },
      { title: "Audit Log", url: "/audit-log", icon: History },
    ],
  },
];

export const settingsNavItem: SidebarNavItem = {
  title: "Settings",
  url: "/settings",
  icon: Settings,
};
