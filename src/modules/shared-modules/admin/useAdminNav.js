import { useNavigate } from "react-router";

const ROUTE_MAP = {
  dashboard: "/dashboard",
  leads: "/leads",
  import: "/lead-import",
  assignments: "/assignments",
  assign: "/assignments/assign",
  people: "/people-teams",
  projects: "/projects-properties",
  project: "/projects-properties",
  "add-project": "/projects-properties/add",
  bookings: "/bookings-approval",
  secondary: "/secondary-market",
  cn: "/convertible-notes",
  commission: "/commission",
  hr: "/hr-attendance",
  "mark-attendance": "/hr-attendance/mark",
  reports: "/report-mis",
  audit: "/audit-log",
  settings: "/settings",
  notifications: "/settings",
};

export function useAdminNav() {
  const navigate = useNavigate();

  const go = (page, param) => {
    const base = ROUTE_MAP[page] || "/dashboard";
    if (page === "assign" && param) {
      navigate(`${base}/${param}`);
      return;
    }
    if (page === "project" && param) {
      navigate(`${base}/${param}`);
      return;
    }
    navigate(base);
  };

  return { go, navigate };
}
