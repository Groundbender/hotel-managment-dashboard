import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://oipgwnvilxqdnwxralox.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1) Create/edit cabin
  let query = supabase.from("cabins");

  // a) create if(!id)

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // b) edit  if(id)
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single(); // I added select and single to return new element out of the array;

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2) Upload image

  if (hasImagePath) return data; // img path exists and we don't need to upload new image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); // name, our image itself

  // 3) Delete the cabin if storage error

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin could not be uploaded and was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  // id column === id we passed

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
