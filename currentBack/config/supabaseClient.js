import dotenv from "dotenv";
dotenv.config({ path: ".env.server" });

import { createClient } from "@supabase/supabase-js";
if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not yet set/defined");
}
const supabaseUrl = process.env.SUPABASE_URL; // NOTE: doublecehck that the "as string" doesn't potentially cause bugs

if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_ANON_KEY is not yet set/defined");
}
const supabaseKey = process.env.SUPABASE_ANON_KEY; // NOTE: doublecehck that the "as string" doesn't potentially cause bugs

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
