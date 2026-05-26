"use client";

import { useState, useEffect } from "react";
import { loadLecturersDb } from "@/lib/storage";

export default function PlacementsPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [tpo, setTpo] = useState<any>(null);

  useEffect(() => {
    async function getTpoDetails() {
      try {
        const list = await loadLecturersDb();
        // The Head of Garment Technology in ADFT department is also the TPO
        const tpoMember = list.find(l => l.dept === "adft" && l.profession.toLowerCase().includes("head"));
        if (tpoMember) {
          setTpo(tpoMember);
        }
      } catch (e) {
        console.error("Failed to load TPO:", e);
      }
    }
    getTpoDetails();
  }, []);

  const stats = [
    { label: "Placement Rate", value: "85%" },
    { label: "Companies Visited", value: "45+" },
    { label: "Highest Package", value: "8 LPA" },
    { label: "Average Package", value: "4.5 LPA" },
  ];

  const driveImages = [
    {
      src: "/images/placement_drive_1.png",
      alt: "Students receiving appointment letters from Indosol Solar Pvt Ltd officials",
      caption: "Smt. Jasti Usha Rani (Principal) and Indosol Solar representatives distributing job offers to selected students."
    },
    {
      src: "/images/placement_drive_2.png",
      alt: "Principal and company representatives at the placement drive venue",
      caption: "Distinguished faculty and corporate placement coordinators during the recruitment drive launch."
    }
  ];

  const newsImages = [
    {
      src: "/images/placement_news_1.png",
      title: "Eenadu News Coverage",
      desc: "Detailed report of the placement drive highlighting the ₹25k salary packages."
    },
    {
      src: "/images/placement_news_2.png",
      title: "Sakshi E-Paper Feature",
      desc: "Coverage emphasizing 55 selections in campus interviews."
    },
    {
      src: "/images/placement_news_3.png",
      title: "ABN Andhra Jyothi Coverage",
      desc: "State-wide press recognition of the successful drive."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl tracking-wider">Training & Placements</h1>
        <div className="w-16 h-1 bg-pink-500 mx-auto mt-3"></div>
        <p className="mt-4 text-blue-200 normal-case tracking-normal text-sm md:text-base max-w-2xl mx-auto px-4">
          Bridging the gap between academic learning and industry requirements to secure bright career paths for our students.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-16">
        
        {/* TPO Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="bg-white p-8 border border-gray-200 shadow-sm rounded-lg flex flex-col items-center max-w-sm w-full text-center hover:shadow-md transition-shadow">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
              Training & Placement Officer (TPO)
            </h2>
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 mb-6 bg-gray-50 flex items-center justify-center shadow-inner">
              {tpo?.image ? (
                <img 
                  src={tpo.image} 
                  alt={tpo.name} 
                  className="w-full h-full object-cover object-top" 
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-college-blue text-5xl font-bold">
                  {tpo?.name ? tpo.name.charAt(0) : "R"}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {tpo?.name || "R. Lokesh, B.E(Tex Tech)"}
              </h3>
              <p className="text-blue-600 font-semibold text-sm mt-1 uppercase tracking-wider">
                Head of Garment Technology & TPO
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs w-full mt-6 pt-6 border-t border-gray-100 text-gray-500">
              <div>
                <span className="block font-bold text-gray-700 text-sm">34+ Yrs</span>
                Total Experience
              </div>
              <div>
                <span className="block font-bold text-gray-700 text-sm">gpwwebguntur15@gmail.com</span>
                Contact Email
              </div>
            </div>
          </div>
        </div>

        {/* Placement Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-8 text-center border-b-4 border-blue-600 shadow-sm rounded-lg hover:-translate-y-1 transition-transform duration-250">
              <p className="text-4xl font-bold text-college-blue mb-2">{s.value}</p>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Current Placement Spotlight Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-8 md:p-12 mb-20">
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <span className="text-pink-600 font-bold text-xs uppercase tracking-widest block mb-1">Spotlight</span>
            <h2 className="text-3xl font-bold text-college-blue uppercase">
              Indosol Solar Placement Drive Success
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-2 space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900">
                A massive off-campus placement drive conducted by <strong>Indosol Solar Private Limited</strong> at the Government Polytechnic for Women, Guntur campus concluded with outstanding success.
              </p>
              <p>
                A total of <strong>132 students</strong> representing 18 polytechnics from across the state participated in the intensive screening and oral interviews. Out of these, <strong>55 female students</strong> were successfully selected for employment, demonstrating exceptional technical competency.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="font-bold text-college-blue block mb-1 text-sm uppercase">Recruitment Details</span>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li><strong>Positions Offered:</strong> Diploma Engineer Trainees (DET)</li>
                  <li><strong>Salary Package:</strong> ₹25,000 per month</li>
                  <li><strong>Selected Fields:</strong> Electronics, Electrical, Mechanical & Instrumentation</li>
                  <li><strong>Location:</strong> Ramayapatnam, Andhra Pradesh</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8 flex flex-col justify-center text-center">
              <span className="text-5xl mb-2">🎉</span>
              <h3 className="text-5xl font-black text-blue-600 mb-2">55</h3>
              <p className="text-college-blue font-bold uppercase tracking-wider text-sm mb-4">Students Selected</p>
              <div className="w-12 h-0.5 bg-blue-300 mx-auto mb-4"></div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Empowering female engineering graduates with lucrative industrial careers starting at ₹25K/month.
              </p>
            </div>
          </div>

          {/* Drive Photo Gallery */}
          <h3 className="text-lg font-bold text-college-blue uppercase mb-6 border-b pb-2">Recruitment Drive Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {driveImages.map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setSelectedImg(img.src)}>
                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-gray-50 aspect-[16/10] relative">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-college-blue px-4 py-2 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">Zoom Image 🔍</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 italic leading-relaxed text-center px-4">{img.caption}</p>
              </div>
            ))}
          </div>

          {/* News Paper Clippings Section */}
          <h3 className="text-lg font-bold text-college-blue uppercase mb-6 border-b pb-2">Press & Newspaper Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsImages.map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setSelectedImg(img.src)}>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white aspect-[9/16] relative flex items-center justify-center p-2 shadow-sm">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-college-blue px-4 py-2 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">Read Article 🔍</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-bold text-gray-800 text-sm">{img.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Corporate Recruiters Logos */}
        <div className="bg-white p-12 shadow-sm border border-gray-150 rounded-xl">
          <h2 className="text-2xl font-bold text-college-blue mb-8 uppercase border-l-4 border-blue-600 pl-4">Our Top Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-70">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-12 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" className="h-12 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-12 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="h-12 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Cognizant_logo_2022.svg" alt="Cognizant" className="h-12 object-contain" />
          </div>
        </div>

      </div>

      {/* Lightbox / Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in cursor-pointer"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button 
              className="absolute top-[-40px] right-0 text-white font-bold text-2xl hover:text-pink-500 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              ✕ CLOSE
            </button>
            <img 
              src={selectedImg} 
              alt="Zoomed View" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-white/10" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
