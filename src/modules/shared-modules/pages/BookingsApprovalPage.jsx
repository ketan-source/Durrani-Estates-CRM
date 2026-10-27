import { useState } from "react";
import { BookingsApprovalScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { BOOKINGS } from "@/data";
import { useToast } from "@/components/kit";

export default function BookingsApprovalPage() {
  const toast = useToast();
  const [bookings, setBookings] = useState(
    BOOKINGS.map((b, i) => ({
      ...b,
      status: i === 1 ? "Approved" : i === 3 ? "Rejected" : "Pending",
    })),
  );

  return (
    <PageFrame>
      <BookingsApprovalScreen
        bookings={bookings}
        onDecide={(id, d, note) => {
          setBookings(
            bookings.map((b) =>
              b.id === id
                ? {
                    ...b,
                    status: d === "Approve" ? "Approved" : d === "Reject" ? "Rejected" : "Pending",
                  }
                : b,
            ),
          );
          toast(`${id} ${d}${note ? `: ${note}` : ""}`);
        }}
      />
    </PageFrame>
  );
}
