import type { Cabin } from "../components/CabinForm";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createCabin(newCabin: Cabin) {
  const imageIsFile = newCabin.image instanceof File;
  const hasImagePath =
    !imageIsFile &&
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName = imageIsFile
    ? `${Math.random()}-${(newCabin.image as File).name}`.replaceAll("/", "")
    : "";

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }
}


export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
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
