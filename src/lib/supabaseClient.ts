import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance = null;

export const getSupabaseClient = () => {
    if (!supabaseInstance) {
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Faltan agregar variables de entorno para Supabase (PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY).");
        }
        supabaseInstance = createClient(supabaseUrl || '', supabaseAnonKey || '');
    }
    return supabaseInstance;
};
