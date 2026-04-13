import supabase from "./supabase";

export async function getBookings({ filter, sortBy }: { filter?: { field: string; value: string }, sortBy: { field: string; direction: string } }) {
  let query = supabase.from("bookings").select("*, cabins(name), guests(fullName, email)");

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  const { data: bookings, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }

  return bookings;
}


