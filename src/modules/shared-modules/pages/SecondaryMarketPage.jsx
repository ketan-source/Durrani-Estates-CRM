import { SecondaryMarketScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { useToast } from "@/components/kit";

export default function SecondaryMarketPage() {
  const toast = useToast();
  const log = (action, entity, details) => toast(`${action}: ${entity}${details ? ` · ${details}` : ""}`);

  return (
    <PageFrame>
      <SecondaryMarketScreen log={log} />
    </PageFrame>
  );
}
