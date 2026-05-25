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
  console.error("Supabase keys are missing!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncPhotos() {
  const updates = [
    {
      id: "7",
      name: "Mr. G. Ravindra, M.Li.Sc.",
      dept: "general",
      age: 44,
      years_in_college: 11,
      profession: "[1] Librarian",
      total_experience: 16,
      image: "/images/librarian.png"
    },
    {
      id: "8",
      name: "Dr. K. Srinivas, M.P.Ed., PhD",
      dept: "general",
      age: 41,
      years_in_college: 7,
      profession: "[1] Physical Director",
      total_experience: 14,
      image: "/images/physical_director.png"
    },
    {
      id: "9",
      name: "Mrs. T. Radha",
      dept: "hostel",
      age: 45,
      years_in_college: 8,
      profession: "[1] Hostel Warden",
      total_experience: 12,
      image: "/images/hostel_warden.png"
    }
  ];

  for (const item of updates) {
    console.log(`Upserting row for ID ${item.id}...`);
    const { error } = await supabase
      .from("lecturers")
      .upsert(item);
    
    if (error) {
      console.error(`Error updating ID ${item.id}:`, error.message);
    } else {
      console.log(`Successfully updated ID ${item.id}`);
    }
  }
}

syncPhotos();
