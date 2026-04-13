import { isToday } from "date-fns";
import { useSearchParams } from "react-router-dom";

import Table from "../components/Table";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { useBookings } from "../hooks/useBookings";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";

export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
}

const optionsFilter = [
  { key: "all", label: "All" },
  { key: "checked-out", label: "Checked out" },
  { key: "checked-in", label: "Checked in" },
  { key: "unconfirmed", label: "Unconfirmed" },
];

const optionsSort = [
  { key: "startDate-desc", label: "Sort by date (recent first)" },
  { key: "startDate-asc", label: "Sort by date (earlier first)" },
  { key: "totalPrice-desc", label: "Sort by amount (high first)" },
  { key: "totalPrice-asc", label: "Sort by amount (low first)" },
];

function Bookings() {
  const { data: bookings, isLoading, error } = useBookings();
  const [searchParams] = useSearchParams();

  const filteredBookings = bookings?.filter((booking) => {
    const filterBy = searchParams.get("status") || optionsFilter[0].key;
    if (filterBy === "checked-out") return booking.status === "checked-out";
    if (filterBy === "checked-in") return booking.status === "checked-in";
    if (filterBy === "unconfirmed") return booking.status === "unconfirmed";
    return true;
  });

  const sortedBookings = filteredBookings?.sort((a, b) => {
    const sortBy = searchParams.get("sortBy") || optionsSort[0].key;
    const [field, direction] = sortBy.split("-");
    const multiplier = direction === "asc" ? 1 : -1;
    if (field === "startDate")
      return (
        (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) *
        multiplier
      );
    return (a[field] - b[field]) * multiplier;
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-800">All bookings</h1>
        <div className="flex items-center gap-4">
          <Filter filterKey="status" options={optionsFilter} />
          <Sort options={optionsSort} />
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error message="Error loading bookings" />
      ) : (
        <Table>
          <Table.Header
            columns={["Cabin", "Guest", "Dates", "Status", "Amount", ""]}
          />
          <Table.Body>
            {sortedBookings?.map((booking) => (
              <Table.Row key={booking.id}>
                <Table.TextCell>{booking.cabins.name}</Table.TextCell>
                <Table.TextCell>
                  <div className="font-medium">{booking.guests.fullName}</div>
                  <div className="text-xs text-stone-500">
                    {booking.guests.email}
                  </div>
                </Table.TextCell>
                <Table.TextCell>
                  <span>
                    {isToday(new Date(booking.startDate))
                      ? "Today"
                      : formatDistanceFromNow(booking.startDate)}{" "}
                    &rarr; {booking.numNights} night stay{" "}
                  </span>
                  <div className="text-xs text-stone-500">
                    {new Date(booking.startDate).toLocaleDateString()} &rarr;{" "}
                    {""}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </Table.TextCell>
                <Table.TextCell>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "checked-in"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "checked-out"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </Table.TextCell>
                <Table.TextCell>
                  {formatCurrency(booking.totalPrice)}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default Bookings;
