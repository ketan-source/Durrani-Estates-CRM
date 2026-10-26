import type { ReactNode } from "react";
import { Upload, Users, UserPlus, FileCheck2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}

const metricsData: MetricCardProps[] = [
  {
    title: "Total Leads",
    value: "1,284",
    subtitle: "+12.4% from last month",
    icon: <UserPlus className="size-5" strokeWidth={1.5} />,
  },
  {
    title: "Active Agents",
    value: "42",
    subtitle: "4 pending invites",
    icon: <Users className="size-5" strokeWidth={1.5} />,
  },
  {
    title: "Open Bookings",
    value: "28",
    subtitle: "7 need approval",
    icon: <FileCheck2 className="size-5" strokeWidth={1.5} />,
  },
  {
    title: "Revenue GTV",
    value: "AED 48.6M",
    subtitle: "+18.2% from last month",
    icon: <Wallet className="size-5" strokeWidth={1.5} />,
  },
];

const HeaderSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organization-wide sales, lead and operational overview.
          </p>
        </div>
        <Button
          asChild
          className="h-10 gap-2 rounded-lg bg-[#C59D33] px-4 text-white hover:bg-[#B08C2C]"
        >
          <Link to="/lead-import">
            <Upload className="h-4 w-4" />
            Import Leads
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricsData.map((metric) => (
          <div
            key={metric.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-600">{metric.subtitle}</p>
              </div>
              <div className="shrink-0 text-gray-300">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSection;
