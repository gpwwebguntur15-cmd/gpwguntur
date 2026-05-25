"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { facilities } from "../page";

const facilityDetails: Record<string, {
  details: string;
  features: string[];
  timing: string;
  gallery: string[];
}> = {
  library: {
    details: "The Central Library is the heart of academic activities. It supports the teaching, research, and extension programs of the college. Our collection is updated annually to include the latest research materials, reference books, and technical literature.",
    features: [
      "More than 50,000 reference and text books.",
      "Access to online journals and digital libraries (DELNET).",
      "Spacious reading hall accommodating up to 150 students.",
      "Automated library management system with OPAC (Online Public Access Catalog).",
      "Dedicated computer terminal section for e-learning."
    ],
    timing: "8:00 AM to 6:00 PM (All working days)",
    gallery: ["/images/media__1778908869443.jpg"]
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
    gallery: ["/images/media__1778908869443.jpg"]
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
    gallery: ["/images/media__1778908989802.jpg"]
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
    gallery: ["/images/media__1778908989802.jpg"]
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
    gallery: ["/images/media__1778908869443.jpg"]
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
    gallery: ["/images/media__1778908882280.jpg"]
  }
};

export default function FacilityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const facility = facilities.find((f) => f.id === id);
  const detail = facilityDetails[id];

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
    <div className="bg-gray-50 min-h-screen py-12">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Description</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{detail.details}</p>
              
              <div className="bg-blue-50 p-6 border-l-4 border-blue-600 mb-8">
                <p className="font-bold text-college-blue mb-1 uppercase text-sm">Working Hours / Availability</p>
                <p className="text-gray-700 font-semibold">{detail.timing}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Key Features & Facilities</h3>
              <ul className="space-y-4">
                {detail.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 text-lg">
                    <span className="text-blue-600">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
