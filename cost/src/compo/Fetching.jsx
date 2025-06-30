import React from "react";
import { createClient } from "@supabase/supabase-js";

function Fetching() {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_KEY_ANON;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return <div>Fetching</div>;
}

export default Fetching;
