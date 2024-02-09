import supabase from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) throw new Error("Unable to get the data");

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabin")
    .insert([newCabin])
    .select();

  if (error) throw new Error("Unable to create the cabin");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) throw new Error("Unable to delete the cabin");

  return data;
}
