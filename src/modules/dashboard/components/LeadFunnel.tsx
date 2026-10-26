import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const funnelStages = [
  { label: "New Leads", value: 1284, width: "100%" },
  { label: "Qualified", value: 742, width: "58%" },
  { label: "Property Sales", value: 412, width: "32%" },
  { label: "Bookings", value: 86, width: "14%" },
  { label: "Closed", value: 54, width: "10%" },
];

const LeadFunnel = () => {
  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">Lead Funnel</h2>
        <Select defaultValue="this-month">
          <SelectTrigger className="h-8 w-auto gap-1.5 border-0 bg-transparent px-2 text-xs font-medium text-gray-500 shadow-none hover:bg-gray-50 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 space-y-4">
        {funnelStages.map((stage) => (
          <div key={stage.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{stage.label}</span>
              <span className="font-semibold tabular-nums text-gray-900">
                {stage.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#C59D33] transition-all"
                style={{ width: stage.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadFunnel;
