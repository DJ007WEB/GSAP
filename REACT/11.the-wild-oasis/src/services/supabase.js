import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dfxdtrslqxwvzcptgnzg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeGR0cnNscXh3dnpjcHRnbnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NzI2NTgsImV4cCI6MjAyMjI0ODY1OH0._EUszmTxP9GlEc8CHjujRidzyGEg2xzYMyA_nNuHZqU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
