import { Lecturer, lecturers as initialLecturers } from "./data";
import { 
  isSupabaseConfigured, 
  getSupabaseLecturers, 
  addSupabaseLecturer, 
  updateSupabaseLecturer, 
  deleteSupabaseLecturer,
  getSupabasePrincipal,
  saveSupabasePrincipal
} from "./supabase";

export interface PrincipalInfo {
  name: string;
  photo: string;
  message: string;
  title: string;
}

export const defaultPrincipal: PrincipalInfo = {
  name: "Dr. J. USHA RANI, M.Com., PhD",
  photo: "/images/usha_rani.jpg",
  title: "Principal - GPW Guntur",
  message: "Welcome to Government Polytechnic For Women, Guntur. Since our inception in 1967, we have been dedicated to the cause of women's empowerment through excellence in technical education. Our institution is not just a center for academic learning, but a cradle for future leaders and innovators.\n\nIn today's rapidly evolving technological landscape, it is crucial that our students are equipped with not only technical proficiency but also the resilience and ethical foundation to navigate their careers. We provide an environment that encourages curiosity, critical thinking, and hands-on expertise.",
};

/* 
 * Principal Storage Sync/Async Helpers
 */
export function getPrincipalInfo(): PrincipalInfo {
  if (typeof window === "undefined") return defaultPrincipal;
  const stored = localStorage.getItem("gpw_principal");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultPrincipal;
    }
  }
  return defaultPrincipal;
}

export async function loadPrincipalDb(): Promise<PrincipalInfo> {
  if (isSupabaseConfigured()) {
    try {
      const dbPrincipal = await getSupabasePrincipal();
      if (dbPrincipal) {
        if (typeof window !== "undefined") {
          localStorage.setItem("gpw_principal", JSON.stringify(dbPrincipal));
        }
        return dbPrincipal;
      }
    } catch (error) {
      console.warn("Failed to fetch principal from Supabase. Falling back to local storage.", error);
    }
  }
  return getPrincipalInfo();
}

export async function savePrincipalDb(info: PrincipalInfo): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem("gpw_principal", JSON.stringify(info));
  }
  
  if (isSupabaseConfigured()) {
    try {
      await saveSupabasePrincipal(info);
    } catch (error) {
      console.error("Failed to save principal to Supabase", error);
      throw error;
    }
  }
}

/* 
 * Lecturers Storage Sync/Async Helpers
 */
export function getLecturers(): Lecturer[] {
  if (typeof window === "undefined") return initialLecturers;
  const stored = localStorage.getItem("gpw_lecturers");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return initialLecturers;
    }
  }
  return initialLecturers;
}

export async function loadLecturersDb(): Promise<Lecturer[]> {
  if (isSupabaseConfigured()) {
    try {
      const dbLecturers = await getSupabaseLecturers();
      if (dbLecturers && dbLecturers.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem("gpw_lecturers", JSON.stringify(dbLecturers));
        }
        return dbLecturers;
      }
    } catch (error) {
      console.warn("Failed to fetch lecturers from Supabase. Falling back to local storage.", error);
    }
  }
  return getLecturers();
}

export async function saveLecturerDb(lecturer: Lecturer): Promise<Lecturer[]> {
  const currentList = getLecturers();
  const index = currentList.findIndex(l => l.id === lecturer.id);
  
  let updatedList: Lecturer[];
  const isEditing = index !== -1;

  if (isEditing) {
    updatedList = [...currentList];
    updatedList[index] = lecturer;
  } else {
    updatedList = [...currentList, lecturer];
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("gpw_lecturers", JSON.stringify(updatedList));
  }

  if (isSupabaseConfigured()) {
    try {
      if (isEditing) {
        await updateSupabaseLecturer(lecturer);
      } else {
        await addSupabaseLecturer(lecturer);
      }
    } catch (error) {
      console.error("Failed to save lecturer to Supabase", error);
      throw error;
    }
  }

  return updatedList;
}

export async function deleteLecturerDb(id: string): Promise<Lecturer[]> {
  const currentList = getLecturers();
  const updatedList = currentList.filter(l => l.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem("gpw_lecturers", JSON.stringify(updatedList));
  }

  if (isSupabaseConfigured()) {
    try {
      await deleteSupabaseLecturer(id);
    } catch (error) {
      console.error("Failed to delete lecturer from Supabase", error);
      throw error;
    }
  }

  return updatedList;
}
