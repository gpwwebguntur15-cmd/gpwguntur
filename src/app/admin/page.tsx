"use client";

import { useState, useEffect } from "react";
import { 
  loadPrincipalDb, 
  savePrincipalDb, 
  loadLecturersDb, 
  saveLecturerDb, 
  deleteLecturerDb,
  PrincipalInfo,
  defaultPrincipal
} from "@/lib/storage";
import { Lecturer } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";

const academicDepts = {
  ece: "Electronics And Communication Engineering",
  ccp: "Commercial And Computer Practice",
  adft: "ADFT",
  pharmacy: "Pharmacy",
};

const administrativeDepts = {
  office: "Office administration",
  hostel: "Hostel",
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [supabaseActive, setSupabaseActive] = useState(false);
  const [showConfigHelp, setShowConfigHelp] = useState(false);
  
  // Principal State
  const [principal, setPrincipal] = useState<PrincipalInfo>(defaultPrincipal);

  // Faculty list state
  const [lecturerList, setLecturerList] = useState<Lecturer[]>([]);
  const [editingLecturerId, setEditingLecturerId] = useState<string | null>(null);

  // Form states
  const [newLecturer, setNewLecturer] = useState({
    name: "",
    dept: "ece",
    age: "",
    yearsInCollege: "",
    profession: "",
    totalExperience: "",
    image: "",
    sortOrder: "",
  });

  const [facultyCategory, setFacultyCategory] = useState<"academic" | "admin">("academic");
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [customDeptName, setCustomDeptName] = useState("");

  const [fullDepartments, setFullDepartments] = useState<Record<string, string>>({
    ece: "Electronics And Communication Engineering",
    ccp: "Commercial And Computer Practice",
    adft: "ADFT",
    pharmacy: "Pharmacy",
    office: "Office administration",
    hostel: "Hostel",
  });

  const [facultySearch, setFacultySearch] = useState("");

  useEffect(() => {
    async function loadData() {
      if (typeof window !== "undefined") {
        setSupabaseActive(isSupabaseConfigured());
        const principalInfo = await loadPrincipalDb();
        const lecturersData = await loadLecturersDb();
        setPrincipal(principalInfo);
        setLecturerList(lecturersData);
        
        // Dynamically discover custom departments
        const customDeptsMap: Record<string, string> = {};
        lecturersData.forEach((l) => {
          const defaultName = {
            ece: "Electronics And Communication Engineering",
            ccp: "Commercial And Computer Practice",
            adft: "ADFT",
            pharmacy: "Pharmacy",
            office: "Office administration",
            hostel: "Hostel",
          }[l.dept];
          
          if (!defaultName) {
            let displayName = l.dept;
            if (displayName.startsWith("adm-")) {
              displayName = displayName.substring(4);
            }
            displayName = displayName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            customDeptsMap[l.dept] = displayName;
          }
        });
        
        setFullDepartments((prev) => ({
          ...prev,
          ...customDeptsMap,
        }));
      }
    }
    loadData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "gpwguntur" && password === "padmavathi") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrincipal(prev => ({ ...prev, [name]: value }));
  };

  const handlePrincipalPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrincipal(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrincipalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await savePrincipalDb(principal);
      alert("Principal's information updated successfully!");
    } catch (err) {
      alert("Error saving principal details: " + (err as Error).message);
    }
  };

  const handleFacultyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLecturer(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateLecturer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalDept = newLecturer.dept;
    if (newLecturer.dept === "other") {
      if (!customDeptName.trim()) {
        alert("Please enter a custom department name");
        return;
      }
      let slug = customDeptName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (facultyCategory === "admin" && !slug.startsWith("adm-")) {
        slug = "adm-" + slug;
      }
      finalDept = slug;
      
      // Cache display name in state immediately
      setFullDepartments(prev => ({
        ...prev,
        [slug]: customDeptName.trim()
      }));
    }

    const facId = editingLecturerId || Date.now().toString();
    const fac: Lecturer = {
      id: facId,
      name: newLecturer.name,
      dept: finalDept,
      age: Number(newLecturer.age),
      yearsInCollege: Number(newLecturer.yearsInCollege),
      profession: newLecturer.profession,
      totalExperience: Number(newLecturer.totalExperience),
      image: newLecturer.image || undefined,
      sortOrder: newLecturer.sortOrder ? Number(newLecturer.sortOrder) : undefined
    };

    try {
      const updatedList = await saveLecturerDb(fac);
      setLecturerList(updatedList);
      
      alert(editingLecturerId ? "Faculty member updated successfully!" : "New faculty member added successfully!");
      
      // Reset form
      setNewLecturer({
        name: "",
        dept: facultyCategory === "academic" ? "ece" : "office",
        age: "",
        yearsInCollege: "",
        profession: "",
        totalExperience: "",
        image: "",
        sortOrder: "",
      });
      setEditingLecturerId(null);
      setIsCustomDept(false);
      setCustomDeptName("");
    } catch (err) {
      alert("Error saving faculty member: " + (err as Error).message);
    }
  };

  const handleEditClick = (lecturer: Lecturer) => {
    setEditingLecturerId(lecturer.id);
    
    const isAcademic = ["ece", "ccp", "adft", "pharmacy"].includes(lecturer.dept);
    const isAdmin = ["office", "hostel"].includes(lecturer.dept);
    
    if (isAdmin) {
      setFacultyCategory("admin");
      setIsCustomDept(false);
      setNewLecturer({
        name: lecturer.name,
        dept: lecturer.dept,
        age: lecturer.age.toString(),
        yearsInCollege: lecturer.yearsInCollege.toString(),
        profession: lecturer.profession,
        totalExperience: lecturer.totalExperience.toString(),
        image: lecturer.image || "",
        sortOrder: lecturer.sortOrder ? lecturer.sortOrder.toString() : "",
      });
    } else if (isAcademic) {
      setFacultyCategory("academic");
      setIsCustomDept(false);
      setNewLecturer({
        name: lecturer.name,
        dept: lecturer.dept,
        age: lecturer.age.toString(),
        yearsInCollege: lecturer.yearsInCollege.toString(),
        profession: lecturer.profession,
        totalExperience: lecturer.totalExperience.toString(),
        image: lecturer.image || "",
        sortOrder: lecturer.sortOrder ? lecturer.sortOrder.toString() : "",
      });
    } else {
      // Custom department!
      const isAdmCustom = lecturer.dept.startsWith("adm-");
      setFacultyCategory(isAdmCustom ? "admin" : "academic");
      setIsCustomDept(true);
      
      let rawName = lecturer.dept;
      if (rawName.startsWith("adm-")) {
        rawName = rawName.substring(4);
      }
      const displayName = rawName.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      setCustomDeptName(displayName);
      
      setNewLecturer({
        name: lecturer.name,
        dept: "other",
        age: lecturer.age.toString(),
        yearsInCollege: lecturer.yearsInCollege.toString(),
        profession: lecturer.profession,
        totalExperience: lecturer.totalExperience.toString(),
        image: lecturer.image || "",
        sortOrder: lecturer.sortOrder ? lecturer.sortOrder.toString() : "",
      });
    }
    
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const updatedList = await deleteLecturerDb(id);
        setLecturerList(updatedList);
        alert(`Faculty member "${name}" deleted successfully.`);
        if (editingLecturerId === id) {
          setEditingLecturerId(null);
          setNewLecturer({
            name: "",
            dept: "ece",
            age: "",
            yearsInCollege: "",
            profession: "",
            totalExperience: "",
            image: "",
            sortOrder: "",
          });
          setIsCustomDept(false);
          setCustomDeptName("");
        }
      } catch (err) {
        alert("Error deleting faculty member: " + (err as Error).message);
      }
    }
  };

  const cancelEdit = () => {
    setEditingLecturerId(null);
    setNewLecturer({
      name: "",
      dept: facultyCategory === "academic" ? "ece" : "office",
      age: "",
      yearsInCollege: "",
      profession: "",
      totalExperience: "",
      image: "",
      sortOrder: "",
    });
    setIsCustomDept(false);
    setCustomDeptName("");
  };

  const filteredLecturers = lecturerList.filter(l => 
    l.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
    fullDepartments[l.dept]?.toLowerCase().includes(facultySearch.toLowerCase())
  );

  // Group filteredLecturers by department
  const groupedLecturers = filteredLecturers.reduce((acc, lecturer) => {
    const deptId = lecturer.dept;
    if (!acc[deptId]) {
      acc[deptId] = [];
    }
    acc[deptId].push(lecturer);
    return acc;
  }, {} as Record<string, Lecturer[]>);

  // Sort each group by sortOrder ascending (defaulting to 999)
  Object.keys(groupedLecturers).forEach((deptId) => {
    groupedLecturers[deptId].sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  });



  const currentDepts = facultyCategory === "academic" ? academicDepts : administrativeDepts;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-college-blue mb-2">ADMIN LOGIN</h2>
            <p className="text-gray-500 text-sm">Access the college management dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-college-blue text-white py-4 rounded font-bold hover:bg-blue-800 transition-colors uppercase tracking-widest shadow-md">
              Sign In
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/" className="inline-block text-sm text-gray-500 hover:text-college-blue font-semibold">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4 md:px-20">
        
        {/* Status indicator and header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold text-college-blue uppercase tracking-tight">Admin Dashboard</h1>
            </div>
            <p className="text-gray-500 font-medium">Configure principal information, messages, photos, and faculty directories.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="bg-college-blue text-white px-6 py-3 rounded font-bold hover:bg-blue-850 transition-all text-xs uppercase tracking-wider shadow-md text-center">
              View Website
            </Link>
          </div>
        </div>

        {/* Database setup help */}
        {showConfigHelp && !supabaseActive && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8 shadow-sm animate-fade-in text-gray-700">
            <h3 className="font-bold text-amber-950 mb-2 uppercase text-sm tracking-wider">Database Setup Instructions</h3>
            <p className="mb-4 text-sm">To connect to the cloud database, please create a <code>.env.local</code> file in your root folder and add the following keys:</p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs font-mono mb-4 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://tmmcyipimbuaeuwyytaz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>`}
            </pre>
            <p className="text-xs text-gray-500">Currently using local storage fallback. All edits will save to local memory until database setup is completed.</p>
          </div>
        )}

        {/* Form Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Section 1: Principal Details Form */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4 uppercase">
              Principal's Desk Info
            </h2>
            <form onSubmit={handlePrincipalSave} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Principal Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                  value={principal.name}
                  onChange={handlePrincipalChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Title / Designation</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                  value={principal.title}
                  onChange={handlePrincipalChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Principal Photo</label>
                <div className="flex items-center gap-4">
                  {principal.photo && (
                    <img 
                      src={principal.photo} 
                      alt="Principal preview" 
                      className="w-20 h-20 rounded-2xl object-cover border border-gray-200 shadow-md" 
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePrincipalPhotoUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                  value={principal.message}
                  onChange={handlePrincipalChange}
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors uppercase tracking-widest shadow-md cursor-pointer">
                Save Principal Details
              </button>
            </form>
          </div>

          {/* Section 2: Add or Edit Faculty */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-pink-600 pl-4 uppercase">
              {editingLecturerId ? "Edit Faculty Details" : "Add New Faculty"}
            </h2>

            {/* Category Tab Selectors */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setFacultyCategory("academic");
                  setNewLecturer(prev => ({ ...prev, dept: "ece" }));
                  setIsCustomDept(false);
                }}
                className={`py-3 px-6 font-bold text-sm border-b-4 transition-all uppercase tracking-wider ${
                  facultyCategory === "academic"
                    ? "border-pink-600 text-pink-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                🎓 Academic Staff
              </button>
              <button
                type="button"
                onClick={() => {
                  setFacultyCategory("admin");
                  setNewLecturer(prev => ({ ...prev, dept: "office" }));
                  setIsCustomDept(false);
                }}
                className={`py-3 px-6 font-bold text-sm border-b-4 transition-all uppercase tracking-wider ${
                  facultyCategory === "admin"
                    ? "border-pink-600 text-pink-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                🏢 Administrative Staff
              </button>
            </div>

            <form onSubmit={handleAddOrUpdateLecturer} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                  value={newLecturer.name}
                  onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Department / Area</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                    value={newLecturer.dept}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewLecturer({ ...newLecturer, dept: val });
                      if (val === "other") {
                        setIsCustomDept(true);
                      } else {
                        setIsCustomDept(false);
                      }
                    }}
                    required
                  >
                    {Object.entries(currentDepts).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                    <option value="other">⭐ Other (Create Custom Department)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Profession / Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                    placeholder="e.g. Associate Professor / Warden / Librarian"
                    value={newLecturer.profession}
                    onChange={(e) => setNewLecturer({ ...newLecturer, profession: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Custom department details if "other" is selected */}
              {isCustomDept && (
                <div className="p-4 bg-pink-50 border-l-4 border-pink-500 rounded animate-fade-in">
                  <label className="block text-sm font-bold text-pink-900 mb-2 uppercase tracking-wider">Custom Department Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-900 font-semibold"
                    placeholder="e.g. Physical Education / Physics"
                    value={customDeptName}
                    onChange={(e) => setCustomDeptName(e.target.value)}
                    required={isCustomDept}
                  />
                </div>
              )}

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs font-semibold text-pink-700">Display Order</label>
                  <input
                    type="number"
                    placeholder="e.g. 1, 2..."
                    className="w-full px-4 py-3 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 font-bold"
                    value={newLecturer.sortOrder}
                    onChange={(e) => setNewLecturer({ ...newLecturer, sortOrder: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Age</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    value={newLecturer.age}
                    onChange={(e) => setNewLecturer({ ...newLecturer, age: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Years In College</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    value={newLecturer.yearsInCollege}
                    onChange={(e) => setNewLecturer({ ...newLecturer, yearsInCollege: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Total Exp</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    value={newLecturer.totalExperience}
                    onChange={(e) => setNewLecturer({ ...newLecturer, totalExperience: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Faculty Photo</label>
                <div className="flex items-center gap-4">
                  {newLecturer.image && (
                    <img 
                      src={newLecturer.image} 
                      alt="Faculty preview" 
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shadow-md" 
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFacultyPhotoUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {editingLecturerId && (
                  <button 
                    type="button" 
                    onClick={cancelEdit} 
                    className="w-1/3 bg-gray-500 text-white py-4 rounded font-bold hover:bg-gray-600 transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  className={`bg-pink-600 text-white py-4 rounded font-bold hover:bg-pink-700 transition-colors uppercase tracking-widest shadow-md cursor-pointer ${editingLecturerId ? "w-2/3" : "w-full"}`}
                >
                  {editingLecturerId ? "Update Faculty" : "Add Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section 3: Faculty List & Manage Section */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-college-blue pl-4 uppercase">
              Manage Faculty Directory
            </h2>
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Search faculty or department..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedLecturers).map(([deptId, deptLecturers]) => (
              <div key={deptId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 className="text-sm font-bold text-college-blue uppercase tracking-wider">
                    📁 {fullDepartments[deptId] || deptId}
                  </h4>
                  <span className="bg-blue-100 text-college-blue text-xs font-bold px-3 py-1 rounded-full">
                    {deptLecturers.length} {deptLecturers.length === 1 ? "Staff" : "Staff Members"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Order / Faculty</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Rank / Profession</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Stats (Age / Col / Exp)</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-1/4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {deptLecturers.map((lecturer) => (
                        <tr key={lecturer.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded" title="Display Order Position">
                                #{lecturer.sortOrder || 999}
                              </span>
                              {lecturer.image ? (
                                <img 
                                  src={lecturer.image} 
                                  alt={lecturer.name} 
                                  className="w-10 h-10 rounded-2xl object-cover border border-gray-200" 
                                />
                              ) : (
                                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-college-blue font-bold text-sm">
                                  {lecturer.name.charAt(0)}
                                </div>
                              )}
                              <span className="font-bold text-gray-800">{lecturer.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-blue-600 font-medium">
                            {lecturer.profession}
                          </td>
                          <td className="p-4 text-sm text-gray-600 font-mono">
                            {lecturer.age}y / {lecturer.yearsInCollege}y / {lecturer.totalExperience}y
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleEditClick(lecturer)}
                                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                              >
                                EDIT
                              </button>
                              <button
                                onClick={() => handleDeleteClick(lecturer.id, lecturer.name)}
                                className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded font-bold text-xs hover:bg-rose-100 transition-colors cursor-pointer"
                              >
                                DELETE
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {Object.keys(groupedLecturers).length === 0 && (
              <div className="p-8 text-center text-gray-500 italic bg-gray-50 border border-dashed border-gray-250 rounded-lg">
                No faculty members found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
