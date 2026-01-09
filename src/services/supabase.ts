import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vkyllgwuoytggeelqmto.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZreWxsZ3d1b3l0Z2dlZWxxbXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzM3MjAsImV4cCI6MjA4MzIwOTcyMH0.3NRdPSjpC3BxpI3lwI1tZURj2S2ahvMmbDZN7PCUoSI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
