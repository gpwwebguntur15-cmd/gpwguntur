"use client";

import { useEffect, useState } from "react";
import { loadLecturersDb } from "@/lib/storage";
import { Lecturer } from "@/lib/data";
import Link from "next/link";

export default function AdministrationPage() {
  const [staff, setStaff] = useState<Lecturer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"office" | "hostel">("office");

  useEffect(() => {
    async function loadData() {
      const list = await loadLecturersDb();
      setStaff(list);
      setIsLoaded(true);
    }
    loadData();
  }, []);

  const officeStaff = staff.filter((l) => l.dept === "office");
  const hostelStaff = staff.filter((l) => l.dept === "hostel");

  const activeStaff = activeTab === "office" ? officeStaff : hostelStaff;

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-20">
      {/* Banner */}
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl">Administration</h1>
        <p className="mt-4 text-blue-200 normal-case">Managing institutional excellence and student welfare</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 mt-12">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8 items-center gap-2">
          <Link href="/" className="hover:text-college-blue transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-college-blue font-bold">ADMINISTRATION</span>
        </nav>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 mb-12">
          <button
            onClick={() => setActiveTab("office")}
            className={`py-4 px-8 font-bold text-lg border-b-4 transition-all uppercase tracking-wider ${
              activeTab === "office"
                ? "border-blue-600 text-college-blue"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            🏢 Office Administration
          </button>
          <button
            onClick={() => setActiveTab("hostel")}
            className={`py-4 px-8 font-bold text-lg border-b-4 transition-all uppercase tracking-wider ${
              activeTab === "hostel"
                ? "border-blue-600 text-college-blue"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            🏠 Hostel Management
          </button>
        </div>

        {/* Section Info */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg mb-12">
          {activeTab === "office" ? (
            <div>
              <h2 className="text-3xl font-bold text-college-blue mb-4 uppercase">Office Administration Office</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                The College Administrative Office manages student registrations, academic admissions, scholarships,
                examination applications, human resources, and general institution coordination. Our dedicated staff
                ensures smooth day-to-day administrative support for students and faculty.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-college-blue mb-4 uppercase">Campus Hostel Boarding</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                Our campus hostel provides a comfortable, safe, and nurturing residential environment for female students.
                Managed by experienced wardens and supervisors, the hostel offers high-quality dining facilities,
                24/7 security, medical care assistance, and recreational amenities to foster mutual growth.
              </p>
            </div>
          )}
        </div>

        {/* Staff Directory */}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4 uppercase">
          {activeTab === "office" ? "Office Staff Directory" : "Hostel Staff & Wardens"}
        </h3>

        {isLoaded && activeStaff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeStaff.map((lecturer) => (
              <div key={lecturer.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="mb-6 flex flex-col items-center">
                  {lecturer.image ? (
                    <img 
                      src={lecturer.image} 
                      alt={lecturer.name} 
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-100 shadow-md mb-4" 
                    />
                  ) : (
                    <div className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center text-college-blue text-4xl font-bold mb-4 shadow-inner">
                      {lecturer.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-college-blue min-h-[56px] flex items-center justify-center px-2">{lecturer.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-1">{lecturer.profession}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-sm w-full mt-auto">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500 uppercase text-[9px] font-bold tracking-wider mb-1">Age</p>
                    <p className="font-bold text-gray-800 text-xs">{lecturer.age} Yrs</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500 uppercase text-[9px] font-bold tracking-wider mb-1">In Service</p>
                    <p className="font-bold text-gray-800 text-xs">{lecturer.yearsInCollege} Yrs</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500 uppercase text-[9px] font-bold tracking-wider mb-1">Experience</p>
                    <p className="font-bold text-gray-800 text-xs">{lecturer.totalExperience} Yrs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No staff members found in this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
