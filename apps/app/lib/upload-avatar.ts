import { createClient } from "@repo/supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function uploadAvatar(file: File) {
  console.log("Starting avatar upload process...");
  console.log("File details:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  const supabase = createClient();
  console.log("Supabase client created");

  // Create a unique file name
  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  console.log("Generated filename:", fileName);

  try {
    // Upload the file
    console.log("Starting file upload to storage...");
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      throw uploadError;
    }

    console.log("File uploaded successfully:", uploadData);

    // Get the public URL
    console.log("Getting public URL...");
    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${fileName}`);

    console.log("Public URL generated:", publicUrl);

    // Update user metadata with new avatar URL
    console.log("Updating user metadata with new avatar URL...");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const { error } = await supabase
      .from("users")
      .update({ avatar_url: publicUrl.publicUrl })
      .eq("id", user.id)
      .select()
      .single();
    if (!error) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl.publicUrl },
      });
      if (updateError) {
        console.error("Error updating user metadata:", updateError);
        throw updateError;
      }
    } else {
      console.error("Error updating user metadata:", error);
      throw error;
    }

    console.log("User metadata updated successfully");
    return publicUrl.publicUrl;
  } catch (error) {
    console.error("Error in uploadAvatar:", error);
    throw error;
  }
}
