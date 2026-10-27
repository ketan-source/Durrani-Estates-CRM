import { useState } from "react";
import { PeopleScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { AGENTS } from "@/data";
import { useToast } from "@/components/kit";

export default function PeopleTeamsPage() {
  const toast = useToast();
  const [agents, setAgents] = useState(AGENTS);
  const log = (action, entity, details) => toast(`${action}: ${entity}${details ? ` · ${details}` : ""}`);

  return (
    <PageFrame>
      <PeopleScreen agents={agents} setAgents={setAgents} log={log} />
    </PageFrame>
  );
}
