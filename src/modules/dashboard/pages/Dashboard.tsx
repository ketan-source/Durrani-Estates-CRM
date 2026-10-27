import { useMemo, useState } from "react";
import { DashboardScreen } from "@/modules/shared-modules/admin/screens";
import { useAdminNav } from "@/modules/shared-modules/admin/useAdminNav";
import PageFrame from "@/modules/shared-modules/admin/PageFrame";
import { LEADS, BOOKINGS, AGENTS } from "@/data";

const Dashboard = () => {
  const { go } = useAdminNav();
  const [leads] = useState(LEADS);
  const [agents] = useState(AGENTS);
  const bookings = useMemo(
    () =>
      BOOKINGS.map((b, i) => ({
        ...b,
        status: i === 1 ? "Approved" : i === 3 ? "Rejected" : "Pending",
      })),
    [],
  );

  return (
    <PageFrame>
      <DashboardScreen go={go} leads={leads} bookings={bookings} agents={agents} />
    </PageFrame>
  );
};

export default Dashboard;
