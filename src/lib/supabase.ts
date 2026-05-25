import { createClient } from "@supabase/supabase-js";
import { Lecturer } from "./data";
import { PrincipalInfo } from "./storage";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize client only if config is provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helpers to check if Supabase is active
export function isSupabaseConfigured(): boolean {
  return supabase !== null && supabaseUrl !== "YOUR_SUPABASE_URL" && supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";
}

/* 
 * Lecturer Services
 */
export async function getSupabaseLecturers(): Promise<Lecturer[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet. Using local fallback.");
  }
  
  const { data, error } = await supabase!
    .from("lecturers")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  
  // Map snake_case database fields to typescript camelCase model
  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    dept: row.dept,
    age: row.age,
    yearsInCollege: row.years_in_college,
    profession: row.profession,
    totalExperience: row.total_experience,
    image: row.image
  }));
}

export async function addSupabaseLecturer(lecturer: Lecturer): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const { error } = await supabase!
    .from("lecturers")
    .insert([{
      id: lecturer.id,
      name: lecturer.name,
      dept: lecturer.dept,
      age: lecturer.age,
      years_in_college: lecturer.yearsInCollege,
      profession: lecturer.profession,
      total_experience: lecturer.totalExperience,
      image: lecturer.image
    }]);

  if (error) throw error;
}

export async function updateSupabaseLecturer(lecturer: Lecturer): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const { error } = await supabase!
    .from("lecturers")
    .update({
      name: lecturer.name,
      dept: lecturer.dept,
      age: lecturer.age,
      years_in_college: lecturer.yearsInCollege,
      profession: lecturer.profession,
      total_experience: lecturer.totalExperience,
      image: lecturer.image
    })
    .eq("id", lecturer.id);

  if (error) throw error;
}

export async function deleteSupabaseLecturer(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const { error } = await supabase!
    .from("lecturers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* 
 * Principal Services
 */
export async function getSupabasePrincipal(): Promise<PrincipalInfo | null> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const { data, error } = await supabase!
    .from("principal_info")
    .select("*")
    .eq("id", "current")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Row not found
      return null;
    }
    throw error;
  }

  return {
    name: data.name,
    photo: data.photo,
    title: data.title,
    message: data.message
  };
}

export async function saveSupabasePrincipal(info: PrincipalInfo): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const { error } = await supabase!
    .from("principal_info")
    .upsert({
      id: "current",
      name: info.name,
      photo: info.photo,
      title: info.title,
      message: info.message,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}
