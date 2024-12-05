import { createClient } from "../clients/server"; // Adjust the import based on your project structure

export const getGdprSettings = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gdpr_settings")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return { data, error };
};

export const insertGdprSettings = async (settings: any) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("gdpr_settings").insert(settings);

  return { data, error };
};

export const updateGdprSettings = async (settings: any) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gdpr_settings")
    .update(settings)
    .eq("user_id", settings.user_id);

  return { data, error };
};
