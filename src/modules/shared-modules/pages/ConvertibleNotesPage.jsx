import { ConvertibleNotesScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { useToast } from "@/components/kit";

export default function ConvertibleNotesPage() {
  const toast = useToast();
  const log = (action, entity, details) => toast(`${action}: ${entity}${details ? ` · ${details}` : ""}`);

  return (
    <PageFrame>
      <ConvertibleNotesScreen log={log} />
    </PageFrame>
  );
}
