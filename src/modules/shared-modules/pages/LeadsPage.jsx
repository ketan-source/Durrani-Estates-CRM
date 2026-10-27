import { useState } from "react";
import { LeadsScreen } from "../admin/screens";
import { useAdminNav } from "../admin/useAdminNav";
import PageFrame from "../admin/PageFrame";
import { LEADS, AGENTS } from "@/data";
import { useToast } from "@/components/kit";

export default function LeadsPage() {
  const { go } = useAdminNav();
  const toast = useToast();
  const [leads, setLeads] = useState(LEADS);
  const [agents] = useState(AGENTS);

  return (
    <PageFrame>
      <LeadsScreen
        leads={leads}
        agents={agents}
        go={go}
        onCreate={(l) => {
          setLeads([l, ...leads]);
          toast(`${l.id} created`);
        }}
      />
    </PageFrame>
  );
}
