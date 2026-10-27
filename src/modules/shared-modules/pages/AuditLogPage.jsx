import { useState } from "react";
import { AuditScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { AUDIT } from "@/data";

export default function AuditLogPage() {
  const [audit] = useState(AUDIT);

  return (
    <PageFrame>
      <AuditScreen audit={audit} />
    </PageFrame>
  );
}
