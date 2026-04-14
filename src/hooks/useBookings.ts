import { useQuery } from "@tanstack/react-query";
import {
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue};

  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  return useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });
}

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDate = !searchParams.get("last") ? 7: Number(searchParams.get("last"));
  const queryDate = new Date(new Date().getTime() - numDate * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDate}-days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return {recentBookings, isLoading};
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDate = !searchParams.get("last") ? 7: Number(searchParams.get("last"));
  const queryDate = new Date(new Date().getTime() - numDate * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentStays, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDate}-days`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmStays = recentStays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");
  return {recentStays, confirmStays, isLoading};
}