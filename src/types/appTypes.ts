
// Custom type definitions that extend Supabase types
export interface SalaryData {
  id: string;
  company: string;
  position: string;
  salary: string;
  bachelors_university: string | null;
  masters_university: string | null;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  created_at?: string;
}

export interface SearchHistoryItem {
  id: string;
  user_id: string;
  position_query: string | null;
  company_query: string | null;
  search_date: string;
}

export interface AuthState {
  user: any | null;
  session: any | null;
}
