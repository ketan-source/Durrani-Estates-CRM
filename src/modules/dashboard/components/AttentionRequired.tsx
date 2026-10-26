import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const attentionItems = [
  {
    count: 7,
    title: "Booking approvals",
    description: "Admin review required",
    href: "/bookings-approval",
  },
  {
    count: 12,
    title: "Unassigned leads",
    description: "Need ownership assignment",
    href: "/assignments",
  },
  {
    count: 5,
    title: "Pending leave requests",
    description: "Employee requests awaiting review",
    href: "/hr-attendance",
  },
  {
    count: 3,
    title: "Capacity alerts",
    description: "Agents at assignment capacity",
    href: "/people-teams",
  },
];

const AttentionRequired = () => {
  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">Attention Required</h2>
        <Button
          asChild
          variant="ghost"
          className="h-8 px-2 text-sm font-medium text-gray-500 hover:bg-transparent hover:text-[#C59D33]"
        >
          <Link to="/bookings-approval">View all</Link>
        </Button>
      </div>

      <div className="mt-4 space-y-1">
        {attentionItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#C59D33]/05"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F5EBD4] text-sm font-semibold text-[#C59D33]">
              {item.count}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-gray-400" strokeWidth={1.75} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AttentionRequired;
