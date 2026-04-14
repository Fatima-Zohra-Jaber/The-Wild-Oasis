import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import StatBox from "./StatBox";
import { formatCurrency } from "../utils/helpers";

interface StatisticsProps {
  bookings: any[];
  confirmStays: any[];
  days: number;
  cabinsCount: number;
}
function Statistics({
  bookings,
  confirmStays,
  days,
  cabinsCount,
}: StatisticsProps) {
  const salses = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0,
  );

  const occupancyRate = (confirmStays.reduce((total, stay) => total + stay.numNights, 0) / (cabinsCount * days)) * 100;

  return (
    <div className="flex gap-4">
      <StatBox
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings?.length}
      />
      <StatBox
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(salses)}
      />
      <StatBox
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={confirmStays?.length}
      />
      <StatBox
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate)}%`}
      />
    </div>
  );
}

export default Statistics;
