import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) throw new Error("Unable to get the data");

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error } = await supabase
    .from("cabin")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) throw new Error("Unable to create the cabin");

  const { data, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabin").delete().eq("id", data.id);

    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) throw new Error("Unable to delete the cabin");

  return data;
}
