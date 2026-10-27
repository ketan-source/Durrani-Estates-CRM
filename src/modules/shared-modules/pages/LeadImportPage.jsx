import { LeadImportScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { useToast } from "@/components/kit";

export default function LeadImportPage() {
  const toast = useToast();

  return (
    <PageFrame>
      <LeadImportScreen
        onDone={(n) => {
          toast(`${n} leads imported`);
        }}
      />
    </PageFrame>
  );
}
