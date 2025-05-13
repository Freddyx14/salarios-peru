
import { supabase } from "@/integrations/supabase/client";
import { SalaryData } from "@/types/appTypes";

export const searchSalaries = async (position: string, company: string): Promise<SalaryData[]> => {
  let query = supabase
    .from('salaries')
    .select('*');
  
  // Aplicando filtros según los parámetros proporcionados
  if (position) {
    query = query.ilike('position', `%${position}%`);
  }
  
  if (company) {
    query = query.ilike('company', `%${company}%`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error al buscar salarios:", error);
    return [];
  }
  
  return data as SalaryData[];
};

export const getRandomSalary = async (): Promise<SalaryData | null> => {
  const { data, error } = await supabase
    .from('salaries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
    
  if (error || !data || data.length === 0) {
    console.error("Error al obtener salario aleatorio:", error);
    return null;
  }
  
  // Seleccionar un registro aleatorio de los últimos 20
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex] as SalaryData;
};

export const saveSearchHistory = async (userId: string, position: string, company: string) => {
  if (!userId) return;
  
  const { error } = await supabase
    .from('search_history')
    .insert({
      user_id: userId,
      position_query: position || null,
      company_query: company || null
    });
    
  if (error) {
    console.error("Error al guardar historial de búsqueda:", error);
  }
};

export const getSearchHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', userId)
    .order('search_date', { ascending: false });
    
  if (error) {
    console.error("Error al obtener historial de búsqueda:", error);
    return [];
  }
  
  return data;
};

export const deleteSearchHistory = async (userId: string) => {
  const { error } = await supabase
    .from('search_history')
    .delete()
    .eq('user_id', userId);
    
  if (error) {
    console.error("Error al eliminar historial de búsqueda:", error);
    throw new Error("No se pudo eliminar el historial de búsqueda");
  }
  
  return true;
};

// Nuevas funciones para trabajos guardados
export const saveJob = async (userId: string, jobId: string) => {
  if (!userId) return false;
  
  // Verificar si ya está guardado
  const { data: existingJob } = await supabase
    .from('saved_jobs')
    .select('id')
    .eq('user_id', userId)
    .eq('job_id', jobId)
    .maybeSingle();
    
  if (existingJob) {
    return true; // Ya está guardado
  }
  
  const { error } = await supabase
    .from('saved_jobs')
    .insert({
      user_id: userId,
      job_id: jobId
    });
    
  if (error) {
    console.error("Error al guardar trabajo:", error);
    return false;
  }
  
  return true;
};

export const getSavedJobs = async (userId: string): Promise<SalaryData[]> => {
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('saved_jobs')
    .select(`
      job_id,
      salaries:job_id (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error al obtener trabajos guardados:", error);
    return [];
  }
  
  // Extraer los datos de salarios de los resultados
  return data?.map(item => item.salaries) || [];
};

export const deleteSavedJob = async (userId: string, jobId: string): Promise<boolean> => {
  if (!userId) return false;
  
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId);
    
  if (error) {
    console.error("Error al eliminar trabajo guardado:", error);
    return false;
  }
  
  return true;
};

export const checkIfJobIsSaved = async (userId: string, jobId: string): Promise<boolean> => {
  if (!userId) return false;
  
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('id')
    .eq('user_id', userId)
    .eq('job_id', jobId)
    .maybeSingle();
    
  if (error) {
    console.error("Error al verificar si el trabajo está guardado:", error);
    return false;
  }
  
  return !!data;
};
