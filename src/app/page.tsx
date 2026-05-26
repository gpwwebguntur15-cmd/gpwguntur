"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadPrincipalDb, PrincipalInfo, defaultPrincipal } from "@/lib/storage";

const departments = [
  { id: "ece", name: "Electronics And Communication Engineering", desc: "Communication systems & circuit design.", icon: "📡" },
  { id: "ccp", name: "Commercial And Computer Practice", desc: "Modern commerce, accounting, and computer practice skills.", icon: "📊" },
  { id: "adft", name: "ADFT", desc: "Apparel Design and Fashion Technology for creative designers.", icon: "👗" },
  { id: "pharmacy", name: "Pharmacy", desc: "Pharmaceutical sciences, chemistry, and clinical practice.", icon: "💊" }
];

export default function Home() {
  const [principal, setPrincipal] = useState<PrincipalInfo>(defaultPrincipal);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const info = await loadPrincipalDb();
      setPrincipal(info);
      setIsLoaded(true);
    }
    loadData();
  }, []);

  const heroImages = [
    { src: "/images/media__1778908869443.jpg", title: "Empowering Women through Education", sub: "Government Polytechnic For Women, Guntur" },
    { src: "/images/media__1778908989802.jpg", title: "Excellence Since 1967", sub: "A Legacy of Academic and Technical Success" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section / Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center hero-gradient flex items-center" 
          style={{ backgroundImage: `url(${heroImages[0].src})`, backgroundBlendMode: 'overlay' }}
        >
          <div className="container mx-auto px-4 md:px-20">
            <div className="max-w-2xl text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                {heroImages[0].title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                {heroImages[0].sub}
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-college-blue px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
                  OUR VISION
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition-colors">
                  OUR MISSION
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Summary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 shadow-lg border-t-4 border-blue-600">
            <h3 className="text-2xl font-bold text-college-blue mb-6">VISION</h3>
            <p className="text-gray-600 italic leading-relaxed">
              "To be a premier institution in technical education, fostering an environment where women can excel as skilled professionals and contribute meaningfully to the global technological landscape."
            </p>
          </div>
          <div className="bg-white p-10 shadow-lg border-t-4 border-pink-600">
            <h3 className="text-2xl font-bold text-college-blue mb-6">MISSION</h3>
            <ul className="text-gray-600 space-y-4">
              <li className="flex gap-3"><span>🔹</span> Provide quality technical education with industry-relevant skills.</li>
              <li className="flex gap-3"><span>🔹</span> Empower women through holistic development and ethical leadership.</li>
              <li className="flex gap-3"><span>🔹</span> Encourage innovation and continuous learning in emerging technologies.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Principal's Desk Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Principal Photo and Name/Title Underneath */}
            <div className="lg:w-1/3 relative w-full flex flex-col items-center">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full opacity-50 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-pink-100 rounded-full opacity-50 z-0"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white w-full max-w-sm">
                <img src={principal.photo} alt="Principal" className="w-full aspect-[4/5] object-cover object-top" />
              </div>
              <div className="mt-6 text-center z-10">
                <p className="text-2xl font-bold text-college-blue uppercase tracking-tight">{principal.name}</p>
                <p className="text-gray-500 font-semibold uppercase text-xs tracking-widest mt-1">{principal.title}</p>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <h2 className="text-4xl font-bold text-college-blue mb-8 border-l-8 border-blue-600 pl-6 uppercase tracking-tight">
                From the Principal's Desk
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p className="font-semibold text-gray-800 italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <div className="whitespace-pre-line">
                  {principal.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-20">
          <h2 className="section-title">Academic Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <Link key={dept.id} href={`/department/${dept.id}`}>
                <div className="group bg-white border border-gray-100 rounded-xl p-8 text-center hover:bg-college-blue hover:text-white hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{dept.icon}</div>
                    <h3 className="text-xl font-bold mb-4">{dept.name}</h3>
                    <p className="text-gray-500 group-hover:text-blue-100 mb-6 text-sm">{dept.desc}</p>
                  </div>
                  <span className="text-blue-600 font-bold group-hover:text-white text-sm">READ MORE →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-20 bg-college-blue text-white">
        <div className="container mx-auto px-4 md:px-20">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-wider">Campus Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-6 text-blue-400">📚</div>
              <h3 className="text-xl font-bold mb-4">Library</h3>
              <p className="text-blue-100 text-sm">Extensive collection of technical books, journals, and digital resources to support academic excellence.</p>
              <Link href="/facilities/library" className="inline-block mt-4 text-blue-300 hover:text-white text-sm font-semibold">Explore Library →</Link>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-6 text-blue-400">🧪</div>
              <h3 className="text-xl font-bold mb-4">Modern Labs</h3>
              <p className="text-blue-100 text-sm">Well-equipped laboratories for practical training in computer engineering, chemistry, pharmacy, and fashion design.</p>
              <Link href="/facilities/labs" className="inline-block mt-4 text-blue-300 hover:text-white text-sm font-semibold">Explore Laboratories →</Link>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-6 text-blue-400">🏆</div>
              <h3 className="text-xl font-bold mb-4">Sports</h3>
              <p className="text-blue-100 text-sm">State-of-the-art sports facilities encouraging physical fitness and teamwork among students.</p>
              <Link href="/facilities/sports" className="inline-block mt-4 text-blue-300 hover:text-white text-sm font-semibold">Explore Sports →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* News & Placements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-college-blue mb-8 border-b-2 border-college-blue pb-2 inline-block uppercase">Latest Events & Achievements</h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="bg-gray-100 p-4 text-center min-w-[100px] group-hover:bg-college-blue group-hover:text-white transition-colors font-bold">
                  <p className="text-2xl">NBA</p>
                  <p className="text-xs uppercase">Accredited</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">NBA Accreditation for ECE Course</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">The Electronics and Communications Engineering Course is accredited by the National Board of Accreditation for a period of 3 years from 2023-24.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-gray-100 p-4 text-center min-w-[100px] group-hover:bg-college-blue group-hover:text-white transition-colors font-bold">
                  <p className="text-2xl">BEST</p>
                  <p className="text-xs uppercase">Award</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Best Placement Record at State Level</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">The Govt. Polytechnic for Women, Guntur is awarded with the BEST PLACEMENT RECORD at the State Level in the year 2023.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-gray-100 p-4 text-center min-w-[100px] group-hover:bg-college-blue group-hover:text-white transition-colors font-bold">
                  <p className="text-2xl">HOST</p>
                  <p className="text-xs uppercase">Sports</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Inter Polytechnic Sports & Games Meet</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">The Institute successfully conducted the Inter Polytechnic Sports & Games Regional Meet for Girls in 2022-23 and 2023-24.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-college-blue mb-6 border-b-2 border-college-blue pb-2 uppercase">Placements</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 shadow-sm border border-gray-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-6 w-20 object-contain" />
                </div>
                <div>
                  <p className="font-bold text-sm">12 Students Placed</p>
                  <p className="text-xs text-gray-500">Academic Year 2025-26</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 shadow-sm border border-gray-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" className="h-6 w-20 object-contain" />
                </div>
                <div>
                  <p className="font-bold text-sm">18 Students Placed</p>
                  <p className="text-xs text-gray-500">Academic Year 2025-26</p>
                </div>
              </div>
              <Link href="/placements" className="block text-center bg-college-blue text-white py-3 font-bold hover:bg-blue-800 transition-colors text-sm uppercase tracking-wider">
                VIEW ALL PLACEMENTS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
