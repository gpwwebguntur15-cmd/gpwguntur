"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { departments } from "@/lib/data";
import { loadLecturersDb } from "@/lib/storage";
import { Lecturer } from "@/lib/data";
import Link from "next/link";

export default function DepartmentPage() {
  const params = useParams();
  const id = params.id as string;
  const [search, setSearch] = useState("");
  const [facultyList, setFacultyList] = useState<Lecturer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const list = await loadLecturersDb();
      setFacultyList(list);
      setIsLoaded(true);
    }
    loadData();
  }, []);

  const deptName = departments[id as keyof typeof departments] || "Department";
  const filteredLecturers = facultyList.filter(
    (l) => l.dept === id && l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-20">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8 items-center gap-2">
          <Link href="/" className="hover:text-college-blue transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/departments" className="hover:text-college-blue transition-colors">DEPARTMENTS</Link>
          <span>/</span>
          <span className="text-college-blue font-bold">{deptName.toUpperCase()}</span>
        </nav>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg mb-12">
          <h1 className="text-4xl font-bold text-college-blue mb-4 uppercase tracking-tight">
            {deptName}
          </h1>
          <div className="w-20 h-1 bg-blue-600 mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Welcome to the {deptName} department. Our faculty is committed to providing 
            excellence in technical education and practical skills, preparing students 
            for the challenges of the modern industry.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search for a lecturer by name..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
        </div>

        {/* Lecturer Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4 uppercase">
          Department Faculty
        </h2>
        
        {isLoaded && filteredLecturers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLecturers.map((lecturer) => (
              <div key={lecturer.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  {lecturer.image ? (
                    <img 
                      src={lecturer.image} 
                      alt={lecturer.name} 
                      className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-inner" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-college-blue text-2xl font-bold">
                      {lecturer.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-college-blue">{lecturer.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm">{lecturer.profession}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-3">
                    <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider mb-1">Age</p>
                    <p className="font-bold text-gray-800">{lecturer.age} Years</p>
                  </div>
                  <div className="bg-gray-50 p-3">
                    <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider mb-1">In College</p>
                    <p className="font-bold text-gray-800">{lecturer.yearsInCollege} Years</p>
                  </div>
                  <div className="bg-gray-50 p-3">
                    <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider mb-1">Experience</p>
                    <p className="font-bold text-gray-800">{lecturer.totalExperience} Years</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No faculty members found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
