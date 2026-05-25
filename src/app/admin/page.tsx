"use client";

import { useState, useEffect } from "react";
import { departments } from "@/lib/data";
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

  const [newLecturer, setNewLecturer] = useState({
    name: "",
    dept: "ece",
    age: "",
    yearsInCollege: "",
    profession: "",
    totalExperience: "",
    image: "",
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
      }
    }
    loadData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "college123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Try admin / college123");
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
    
    const facId = editingLecturerId || Date.now().toString();
    const fac: Lecturer = {
      id: facId,
      name: newLecturer.name,
      dept: newLecturer.dept,
      age: Number(newLecturer.age),
      yearsInCollege: Number(newLecturer.yearsInCollege),
      profession: newLecturer.profession,
      totalExperience: Number(newLecturer.totalExperience),
      image: newLecturer.image || undefined
    };

    try {
      const updatedList = await saveLecturerDb(fac);
      setLecturerList(updatedList);
      
      alert(editingLecturerId ? "Faculty member updated successfully!" : "New faculty member added successfully!");
      
      // Reset form
      setNewLecturer({
        name: "",
        dept: "ece",
        age: "",
        yearsInCollege: "",
        profession: "",
        totalExperience: "",
        image: "",
      });
      setEditingLecturerId(null);
    } catch (err) {
      alert("Error saving faculty member: " + (err as Error).message);
    }
  };

  const handleEditClick = (lecturer: Lecturer) => {
    setEditingLecturerId(lecturer.id);
    setNewLecturer({
      name: lecturer.name,
      dept: lecturer.dept,
      age: lecturer.age.toString(),
      yearsInCollege: lecturer.yearsInCollege.toString(),
      profession: lecturer.profession,
      totalExperience: lecturer.totalExperience.toString(),
      image: lecturer.image || "",
    });
    // Scroll form into view
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
          });
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
      dept: "ece",
      age: "",
      yearsInCollege: "",
      profession: "",
      totalExperience: "",
      image: "",
    });
  };

  const filteredLecturers = lecturerList.filter(l => 
    l.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
    departments[l.dept as keyof typeof departments]?.toLowerCase().includes(facultySearch.toLowerCase())
  );

  const handleResetLocalStorage = () => {
    if (confirm("Are you sure you want to clear all sandbox data in local storage? This will restore the default mock directory data.")) {
      localStorage.removeItem("gpw_lecturers");
      localStorage.removeItem("gpw_principal");
      alert("Local sandbox storage cleared! Reloading...");
      window.location.reload();
    }
  };

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
            <p className="text-xs text-gray-400 mb-2 italic">For demo purposes:</p>
            <p className="text-sm font-mono text-blue-600 bg-blue-50 py-2 rounded">admin / college123</p>
            <Link href="/" className="inline-block mt-6 text-sm text-gray-500 hover:text-college-blue font-semibold">
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
              {supabaseActive ? (
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Supabase Connected</span>
              ) : (
                <button 
                  onClick={() => setShowConfigHelp(!showConfigHelp)}
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  ⚠ Sandbox Mode (Click Setup)
                </button>
              )}
            </div>
            <p className="text-gray-500">Manage principal credentials, website desk, and faculty members</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleResetLocalStorage} className="px-6 py-2 border-2 border-rose-600 text-rose-600 font-bold rounded hover:bg-rose-600 hover:text-white transition-all cursor-pointer">
              RESET SANDBOX CACHE
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="px-6 py-2 border-2 border-college-blue text-college-blue font-bold rounded hover:bg-college-blue hover:text-white transition-all cursor-pointer">
              LOGOUT
            </button>
          </div>
        </div>

        {/* Database instructions */}
        {showConfigHelp && (
          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded mb-8 animate-fade-in">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Supabase Setup Guide</h3>
            <p className="text-sm text-amber-700 mb-4">
              To connect this application to a real Supabase database, create a file named <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">.env.local</code> in the project's root folder and populate it with:
            </p>
            <pre className="bg-gray-900 text-gray-200 p-4 rounded text-xs overflow-x-auto font-mono mb-4">
{`NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`}
            </pre>
            <p className="text-sm text-amber-700">
              Create tables for <code className="font-mono font-bold">lecturers</code> (with fields: id, name, dept, age, years_in_college, profession, total_experience, image, created_at) and <code className="font-mono font-bold">principal_info</code> (with fields: id, name, photo, title, message, updated_at).
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Section 1: Principal's Information */}
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
                      className="w-20 h-20 rounded-full object-cover border border-gray-200" 
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
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-pink-600 pl-4 uppercase">
              {editingLecturerId ? "Edit Faculty Details" : "Add New Faculty"}
            </h2>
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
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Department</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                    value={newLecturer.dept}
                    onChange={(e) => setNewLecturer({ ...newLecturer, dept: e.target.value })}
                    required
                  >
                    {Object.entries(departments).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Profession / Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-semibold"
                    placeholder="e.g. Associate Professor"
                    value={newLecturer.profession}
                    onChange={(e) => setNewLecturer({ ...newLecturer, profession: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                      className="w-16 h-16 rounded-full object-cover border border-gray-200" 
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

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Faculty</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank / Profession</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stats (Age / Col / Exp)</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLecturers.map((lecturer) => (
                  <tr key={lecturer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {lecturer.image ? (
                          <img 
                            src={lecturer.image} 
                            alt={lecturer.name} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-college-blue font-bold text-sm">
                            {lecturer.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-gray-800">{lecturer.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-600">
                      {departments[lecturer.dept as keyof typeof departments] || lecturer.dept}
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
                {filteredLecturers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                      No faculty members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
