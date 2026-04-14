import { useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";
import Spinner from "../components/Spinner";
import Statistics from "../components/Statistics";
import { useRecentBookings, useRecentStays } from "../hooks/useBookings";
import { useCabins } from "../hooks/useCabins";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7: Number(searchParams.get("last"));

  const { recentBookings , isLoading: isBookingsLoading } = useRecentBookings();
  const { confirmStays, isLoading: isStaysLoading } = useRecentStays();
  const {data: cabins, isLoading: isCabinsLoading} =useCabins();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading) <Spinner />;

  const optionsFilter = [
    { key: "7", label: "Last 7 days" },
    { key: "30", label: "Last 30 days" },
    { key: "90", label: "Last 90 days" },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-800 dark:text-slate-50">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Filter filterKey="last" options={optionsFilter} />
        </div>
      </div>
      <Statistics bookings={recentBookings} confirmStays={confirmStays}  days={numDays} cabinsCount={cabins?.length} />
    </>
  );
}

export default Dashboard;
