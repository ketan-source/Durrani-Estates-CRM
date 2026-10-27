import { useState } from "react";
import { AssignmentsScreen, AssignLeadScreen } from "../admin/screens";
import { useAdminNav } from "../admin/useAdminNav";
import PageFrame from "../admin/PageFrame";
import { LEADS, AGENTS } from "@/data";
import { useParams } from "react-router";
import { useToast } from "@/components/kit";

export default function AssignmentsPage({ mode = "list" }) {
  const { go } = useAdminNav();
  const toast = useToast();
  const { leadId } = useParams();
  const [leads, setLeads] = useState(LEADS);
  const [agents, setAgents] = useState(AGENTS);
  const [history, setHistory] = useState([
    ["LEAD-2048", "Sarah Khan → Omar Ali", "10:24 AM"],
    ["LEAD-2042", "Unassigned → Maya Patel", "09:51 AM"],
  ]);

  const assign = (id, agent) => {
    const l = leads.find((x) => x.id === id);
    setLeads(leads.map((x) => (x.id === id ? { ...x, owner: agent } : x)));
    setAgents(
      agents.map((a) =>
        a.name === agent
          ? { ...a, leads: a.leads + 1 }
          : a.name === l?.owner
            ? { ...a, leads: a.leads - 1 }
            : a,
      ),
    );
    setHistory([[id, `${l?.owner || "Unassigned"} → ${agent}`, "Just now"], ...history]);
  };

  if (mode === "assign") {
    return (
      <PageFrame>
        <AssignLeadScreen
          leads={leads}
          agents={agents}
          leadId={leadId}
          onBack={() => go("assignments")}
          onAssign={(id, a) => {
            assign(id, a);
            toast(`Lead assigned to ${a}`);
            go("assignments");
          }}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <AssignmentsScreen agents={agents} leads={leads} history={history} go={go} />
    </PageFrame>
  );
}
