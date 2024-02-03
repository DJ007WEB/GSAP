import supabase from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) throw new Error("Unable to get the data");

  return data;
}
