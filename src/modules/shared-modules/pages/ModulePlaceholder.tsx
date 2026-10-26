import { useLocation } from "react-router";

const titles: Record<string, { title: string; description: string }> = {
  "/leads": {
    title: "Lead",
    description: "Manage and track all incoming property leads.",
  },
  "/lead-import": {
    title: "Lead Import",
    description: "Import leads from CSV, portals, or external sources.",
  },
  "/assignments": {
    title: "Assignments",
    description: "Assign leads and tasks to agents and teams.",
  },
  "/people-teams": {
    title: "People & Teams",
    description: "Manage agents, roles, and team structure.",
  },
  "/projects-properties": {
    title: "Projects & Properties",
    description: "Browse and manage projects and property inventory.",
  },
  "/bookings-approval": {
    title: "Bookings & Approval",
    description: "Review booking requests and approve transactions.",
  },
  "/secondary-market": {
    title: "Secondary Market",
    description: "Track secondary market listings and deals.",
  },
  "/convertible-notes": {
    title: "Convertible Notes",
    description: "Manage convertible note instruments and status.",
  },
  "/commission": {
    title: "Commission",
    description: "View and settle agent commission payouts.",
  },
  "/hr-attendance": {
    title: "HR & Attendance",
    description: "Attendance, leave requests, and HR operations.",
  },
  "/report-mis": {
    title: "Report & MIS",
    description: "Sales, lead, and operational MIS reports.",
  },
  "/audit-log": {
    title: "Audit Log",
    description: "Organization activity and change history.",
  },
  "/settings": {
    title: "Settings",
    description: "Organization preferences and account settings.",
  },
};

const ModulePlaceholder = () => {
  const { pathname } = useLocation();
  const meta = titles[pathname] ?? {
    title: "Module",
    description: "This section is ready for Durrani Estates workflows.",
  };

  return (
    <div className="min-h-full bg-[#F8F9FA] p-4 sm:p-6">
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C59D33]">
          Durrani Estates
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">{meta.title}</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">{meta.description}</p>
        <div className="mt-8 rounded-lg border border-dashed border-[#C59D33]/40 bg-[#C59D33]/05 px-4 py-8 text-center text-sm text-gray-500">
          Content for this module will be connected next.
        </div>
      </div>
    </div>
  );
};

export default ModulePlaceholder;
