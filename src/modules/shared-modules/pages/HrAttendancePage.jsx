import { HRScreen, MarkAttendanceScreen } from "../admin/screens";
import { useAdminNav } from "../admin/useAdminNav";
import PageFrame from "../admin/PageFrame";
import { useToast } from "@/components/kit";

export default function HrAttendancePage({ mode = "list" }) {
  const { go } = useAdminNav();
  const toast = useToast();
  const log = (action, entity, details) => toast(`${action}: ${entity}${details ? ` · ${details}` : ""}`);

  if (mode === "mark") {
    return (
      <PageFrame>
        <MarkAttendanceScreen onBack={() => go("hr")} log={log} />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <HRScreen go={go} />
    </PageFrame>
  );
}
