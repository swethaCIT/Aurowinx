import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mcoflcazajjixjhvbnhj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jb2ZsY2F6YWpqaXhqaHZibmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjYzMjEsImV4cCI6MjA4OTA0MjMyMX0.of7MoFNPSZIOk47QyFku16ideAk1msvFQaBRPAGzJuE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);