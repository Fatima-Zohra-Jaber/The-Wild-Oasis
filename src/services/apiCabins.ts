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
  const { imagePath, hasImagePath, imageName } = getImageDetails(
    newCabin.image,
  );

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

export async function updateCabin(newCabin: Cabin, id: number) {
  const { imagePath, hasImagePath, imageName } = getImageDetails(
    newCabin.image,
  );

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not updated",
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

function getImageDetails(image: File | string) {
  const imageIsFile = image instanceof File;
  const hasImagePath =
    !imageIsFile && typeof image === "string" && image.startsWith(supabaseUrl);

  const imageName = imageIsFile
    ? `${Math.random()}-${(image as File).name}`.replaceAll("/", "")
    : "";

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  return { imagePath, hasImagePath, imageName };
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
