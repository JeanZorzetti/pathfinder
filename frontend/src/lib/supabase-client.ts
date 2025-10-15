import { supabase as supabaseClient } from "@/integrations/supabase/client";

// Type-safe wrapper for Supabase queries
export const supabase = {
  from: (table: string) => {
    return (supabaseClient as any).from(table);
  },
  auth: supabaseClient.auth,
  storage: supabaseClient.storage,
  functions: supabaseClient.functions,
  channel: supabaseClient.channel,
  removeChannel: supabaseClient.removeChannel,
  realtime: supabaseClient.realtime,
};
