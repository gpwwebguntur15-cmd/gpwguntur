const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env.local manually
const envPath = path.resolve(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseAnonKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const lines = envContent.split("\n");
  for (const line of lines) {
    const matchUrl = line.match(/^\s*NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.+)$/);
    if (matchUrl) {
      supabaseUrl = matchUrl[1].trim();
    }
    const matchKey = line.match(/^\s*NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.+)$/);
    if (matchKey) {
      supabaseAnonKey = matchKey[1].trim();
    }
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase keys are missing! Checked env file at:", envPath);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  const { data, error } = await supabase
    .from("lecturers")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error querying table:", error);
  } else {
    console.log("Success! Columns found in one row:", data.length > 0 ? Object.keys(data[0]) : "No rows found");
  }
}

checkColumns();
