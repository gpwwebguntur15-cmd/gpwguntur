"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadLecturersDb } from "@/lib/storage";
import { Lecturer } from "@/lib/data";
import { facilities } from "../page";

interface GalleryItem {
  src: string;
  title?: string;
  intro?: string;
  desc?: string;
}

const facilityDetails: Record<string, {
  details: string;
  features: string[];
  timing: string;
  gallery: GalleryItem[];
}> = {
  library: {
    details: "The Central Library is the heart of academic activities. It supports the teaching, research, and extension programs of the college. Our collection comprises a massive library space, featuring over 6,755 books (with 5,404 procured under Government Head, and 1,291 under the Book Bank Scheme including SC/ST and sponsored books) spanning 1,708 unique titles. The library has adopted an efficient Open Access System and is fully automated using a modern Management Information System (MIS). It offers a dedicated computer section with 7 desktop systems, a high-speed 100 Mbps BSNL Fibre Net internet/Wi-Fi connection, and subscribes to multiple newspapers and journals.",
    features: [
      "More than 50,000 reference and text books.",
      "Access to online journals and digital libraries (DELNET).",
      "Spacious reading hall accommodating up to 150 students.",
      "Automated library management system with OPAC (Online Public Access Catalog).",
      "Dedicated computer terminal section for e-learning."
    ],
    timing: "9:00 AM to 5:30 PM",
    gallery: [
      {
        src: "/images/library_digital_section_1.png",
        title: "Digital Library & E-Learning Center",
        intro: "A modern internet-enabled space designed to provide students access to virtual learning resources, e-journals, and technical databases.",
        desc: "Equipped with high-performance desktop systems connected via high-speed 100 Mbps BSNL Fibre Net. Students can access international journal databases, online lecture series, and the DELNET portal for reference."
      },
      {
        src: "/images/library_digital_section_3.png",
        title: "Computer Terminals & Internet Access",
        intro: "A dedicated computing section built for students to carry out literature reviews, academic research, and project compilation.",
        desc: "Provides hands-on access to academic software, presentation tools, database searching, and online certificate courses under the supervision of qualified library staff."
      },
      {
        src: "/images/library_display_1.png",
        title: "Magazine & Journal Display Area",
        intro: "An interactive periodicals corner designed to display the latest updates in technical journals, national newsletters, and career publications.",
        desc: "Features dedicated newspaper stands and magazine carousels housing national and international journals, technology reviews, weekly circulars, and regional newspapers."
      },
      {
        src: "/images/library_display_2.jpg",
        title: "Current Affairs & Periodical Reading",
        intro: "An open, comfortable reading zone promoting general knowledge, research habits, and career preparation.",
        desc: "Students can refer to competitive examination magazines, employment news, science bulletins, and daily current affairs updates in a quiet study environment."
      }
    ]
  },
  labs: {
    details: "Each engineering and science department has state-of-the-art laboratory facilities designed to provide hands-on experience and bridge the gap between theory and practical applications. All labs are managed by highly qualified technical assistants.",
    features: [
      "ECE: Advanced communication labs, microprocessor kits, and PCB design setups.",
      "Commercial & Computer Practice: Computer labs equipped with accounting software, typing tools, and modern peripherals.",
      "ADFT: Garment construction, textile testing, apparel designing, and fashion illustration labs.",
      "Pharmacy: Pharmaceutics, pharmaceutical chemistry, pharmacognosy, and pharmacology labs.",
      "General Section: Well-equipped physics and chemistry labs for foundational training."
    ],
    timing: "9:00 AM to 5:00 PM",
    gallery: [
      {
        src: "/images/pharmaceutics_lab.png",
        title: "Pharmaceutics Laboratory",
        intro: "The Pharmaceutics Laboratory is a vital practical hub designed for student training in core pharmaceutical formulations, providing the foundational arena for pharmacy practice.",
        desc: "Key Learning & Equipments: Hands-on training in the formulation, preparation, and dispensing of various dosage forms (tablets, capsules, ointments, emulsions, suspensions, parenterals, and cosmetics). Equipped with dissolution test apparatus, tablet punching machines, chemical balances, and distillation units."
      },
      {
        src: "/images/anatomy_pharmacology_lab.png",
        title: "Human Anatomy & Physiology, Pharmacognosy and Pharmacology Laboratory",
        intro: "This multidisciplinary laboratory provides comprehensive training in anatomical systems, plant-based drug identification, and experimental pharmacology.",
        desc: "Key Learning & Equipments: Microscopic studies of plant tissues, morphological identification of crude drugs, analysis of histological slides, blood grouping, blood pressure measurement, and evaluation of drug actions on biological systems. Equipped with compound microscopes, human skeletal models, hemocytometers, and diagnostic kits."
      }
    ]
  },
  classrooms: {
    details: "Our digital and smart classrooms are designed to facilitate modern teaching methodologies. With interactive technology, students gain a richer, more collaborative learning experience.",
    features: [
      "High-definition projectors and interactive smartboards.",
      "High-speed Wi-Fi connectivity for students and staff.",
      "Ergonomically designed seating arrangements for maximum comfort.",
      "Acoustically balanced rooms for clear audibility.",
      "Integrated audio-visual systems for hybrid webinars and guest lectures."
    ],
    timing: "9:00 AM to 4:30 PM",
    gallery: [{ src: "/images/media__1778908989802.jpg", title: "Smart Classroom" }]
  },
  "seminar-hall": {
    details: "The college has a modern, fully air-conditioned Seminar Hall that hosts regular guest lectures, student presentations, workshops, cultural events, and placement drives.",
    features: [
      "Seating capacity of 300+ guests.",
      "Top-grade professional audio and sound systems.",
      "Dual projection screens for clear visibility from all corners.",
      "A spacious stage suitable for academic and cultural ceremonies.",
      "Backstage green rooms and dedicated audio-control booth."
    ],
    timing: "Available for scheduled academic events",
    gallery: [{ src: "/images/media__1778908989802.jpg", title: "Seminar Hall" }]
  },
  sports: {
    details: "We believe in the holistic development of our students. The sports department regularly conducts training camps and encourages participation in inter-polytechnic and state-level tournaments.",
    features: [
      "Spacious outdoor playground for athletics, volleyball, and kabaddi.",
      "Dedicated indoor sports room for table tennis, chess, and carrom.",
      "Qualified physical education trainers offering daily instruction.",
      "Regular yoga and fitness workshops for physical and mental well-being.",
      "Annual sports meet with active participation from all departments."
    ],
    timing: "6:00 AM to 8:30 AM & 4:30 PM to 6:30 PM",
    gallery: [{ src: "/images/media__1778908869443.jpg", title: "Sports Fields" }]
  },
  hostel: {
    details: "Our hostel facility offers a safe, secure, and comfortable 'home away from home' for female students. Located inside the college campus, it provides 24/7 security and a serene environment conducive to studies.",
    features: [
      "Clean, well-ventilated shared rooms with personal wardrobes.",
      "Hygienic dining hall serving nutritious food prepared under strict supervision.",
      "24/7 security staff and CCTV monitoring of common areas.",
      "Purified drinking water and continuous power backup.",
      "Common recreation room with television, newspapers, and indoor games."
    ],
    timing: "24 Hours (Strict gate closing at 6:30 PM)",
    gallery: [{ src: "/images/media__1778908882280.jpg", title: "Hostel Facility" }]
  }
};

export default function FacilityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const facility = facilities.find((f) => f.id === id);
  const detail = facilityDetails[id];
  const [associatedStaff, setAssociatedStaff] = useState<Lecturer | null>(null);

  useEffect(() => {
    async function loadStaff() {
      const list = await loadLecturersDb();
      if (id === "library") {
        const found = list.find(s => s.profession.toLowerCase().includes("librarian"));
        if (found) setAssociatedStaff(found);
      } else if (id === "sports") {
        const found = list.find(s => s.profession.toLowerCase().includes("physical director"));
        if (found) setAssociatedStaff(found);
      }
    }
    loadStaff();
  }, [id]);

  if (!facility || !detail) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800">Facility Not Found</h2>
          <Link href="/facilities" className="mt-4 inline-block text-blue-600 font-bold hover:underline">
            ← Back to Facilities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4 md:px-20">
        <nav className="flex text-sm text-gray-500 mb-8 items-center gap-2">
          <Link href="/" className="hover:text-college-blue transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/facilities" className="hover:text-college-blue transition-colors">FACILITIES</Link>
          <span>/</span>
          <span className="text-college-blue font-bold">{facility.title.toUpperCase()}</span>
        </nav>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{facility.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-college-blue uppercase tracking-tight">
                {facility.title}
              </h1>
              <p className="text-gray-500 font-semibold text-sm mt-1">CAMPUS INFRASTRUCTURE</p>
            </div>
          </div>
          
          <div className="w-20 h-1 bg-blue-600 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Description</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{detail.details}</p>
              
              <div className="bg-blue-50 p-6 border-l-4 border-blue-600 mb-8">
                <p className="font-bold text-college-blue mb-1 uppercase text-sm">Working Hours / Availability</p>
                <p className="text-gray-700 font-semibold">{detail.timing}</p>
              </div>
              
              {id !== "library" && id !== "labs" && (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Key Features & Facilities</h3>
                  <ul className="space-y-4">
                    {detail.features.map((feature, i) => (
                      <li key={i} className="flex gap-3 text-gray-600 text-lg">
                        <span className="text-blue-600">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {id === "library" && (
                <div className="mt-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-college-blue text-white px-6 py-4 font-bold text-base uppercase tracking-wider">
                    Library Data at a Glance
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs">
                          <th className="px-6 py-3 font-bold text-gray-700 uppercase w-16">SI. No</th>
                          <th className="px-6 py-3 font-bold text-gray-700 uppercase">Description</th>
                          <th className="px-6 py-3 font-bold text-gray-700 uppercase">Number / Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-600">
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5 font-semibold">1</td>
                          <td className="px-6 py-3.5 font-semibold text-gray-800">Total No. of Books</td>
                          <td className="px-6 py-3.5 font-bold text-college-blue">6,755</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">2</td>
                          <td className="px-6 py-3.5">No. of Books procured under Govt. Head, Library special fee fund, etc.</td>
                          <td className="px-6 py-3.5 font-semibold">5,404</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">3</td>
                          <td className="px-6 py-3.5">
                            <span className="font-semibold text-gray-800 block mb-1">Procured Under Book Bank Scheme:</span>
                            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500">
                              <li>S.C. Book Bank: <strong className="text-gray-700">600</strong></li>
                              <li>S.T. Book Bank: <strong className="text-gray-700">304</strong></li>
                              <li>Sponsored Books: <strong className="text-gray-700">387</strong></li>
                            </ul>
                          </td>
                          <td className="px-6 py-3.5 font-semibold">1,291</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">4</td>
                          <td className="px-6 py-3.5 font-semibold text-gray-800">Total No. of Titles</td>
                          <td className="px-6 py-3.5 font-semibold">1,708</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">5</td>
                          <td className="px-6 py-3.5">No. of Newspapers</td>
                          <td className="px-6 py-3.5 font-semibold">02</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">6</td>
                          <td className="px-6 py-3.5">No. of Journals / Magazines</td>
                          <td className="px-6 py-3.5 font-semibold">08</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">7</td>
                          <td className="px-6 py-3.5">Library System Adopted</td>
                          <td className="px-6 py-3.5 font-semibold">Open Access System</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">8</td>
                          <td className="px-6 py-3.5">Library Automation</td>
                          <td className="px-6 py-3.5 font-semibold">MIS (Management Information System)</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">9</td>
                          <td className="px-6 py-3.5">No. of Desktop Computers</td>
                          <td className="px-6 py-3.5 font-semibold">07</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">10</td>
                          <td className="px-6 py-3.5">Internet</td>
                          <td className="px-6 py-3.5 font-semibold">BSNL Fibre Net</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">11</td>
                          <td className="px-6 py-3.5">Wi-Fi</td>
                          <td className="px-6 py-3.5 font-semibold">100 Mbps</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                          <td className="px-6 py-3.5">12</td>
                          <td className="px-6 py-3.5">Email</td>
                          <td className="px-6 py-3.5 font-semibold text-blue-600">librariangpwguntur@gmail.com</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-3.5">13</td>
                          <td className="px-6 py-3.5 font-semibold text-gray-800">Library Timings</td>
                          <td className="px-6 py-3.5 font-bold text-green-700">9:00 AM to 5:30 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar with Staff Profile Card */}
            <div>
              {associatedStaff ? (
                <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg flex flex-col">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                    {id === "library" ? "Librarian In-Charge" : "Physical Director"}
                  </h4>
                  <div className="w-full aspect-square overflow-hidden border border-gray-300 mb-4 bg-gray-50 flex items-center justify-center">
                    {associatedStaff.image ? (
                      <img src={associatedStaff.image} alt={associatedStaff.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center text-college-blue text-7xl font-bold">
                        {associatedStaff.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-xl font-bold text-gray-900 leading-tight">{associatedStaff.name}</p>
                    <p className="text-gray-500 font-semibold text-sm mt-1">{associatedStaff.profession}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm w-full pt-4 border-t border-gray-100">
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-gray-400 uppercase text-[9px] font-bold">In Service</p>
                      <p className="font-bold text-gray-800 text-xs">{associatedStaff.yearsInCollege} Yrs</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-gray-400 uppercase text-[9px] font-bold">Experience</p>
                      <p className="font-bold text-gray-800 text-xs">{associatedStaff.totalExperience} Yrs</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-400 text-sm italic border border-dashed border-gray-200">
                  General facilities info.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {detail.gallery && detail.gallery.length > 0 && (
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
            <h3 className="text-2xl font-bold text-college-blue mb-4 uppercase tracking-tight">
              Facility Gallery & Infrastructure
            </h3>
            <div className="w-20 h-1 bg-blue-600 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {detail.gallery.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col p-6">
                  {item.title && (
                    <h4 className="font-bold text-lg text-college-blue mb-2 uppercase tracking-tight">
                      {item.title}
                    </h4>
                  )}
                  {item.intro && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.intro}
                    </p>
                  )}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200 rounded-lg mb-4">
                    <img 
                      src={item.src} 
                      alt={item.title || "Gallery Image"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {item.desc && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
