import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}


export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("idk", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

// cabins.service.ts : Clair si tu utilises la classe CabinsService (common en Angular / backend).

// export class CabinsService{

//  async  getCabins() {
//   const { data: cabins, error } = await supabase.from("cabins").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }

//   return cabins;
// }

// }
// export const cabinsService= new CabinsService()
