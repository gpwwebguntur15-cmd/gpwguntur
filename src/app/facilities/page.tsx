import Link from "next/link";

export const facilities = [
  { id: "library", title: "Central Library", desc: "A vast collection of over 50,000 technical books, national and international journals, and e-resources.", icon: "📚" },
  { id: "labs", title: "Modern Laboratories", desc: "Well-equipped specialized labs for ECE, CCP, ADFT, and Pharmacy departments with latest technology.", icon: "🧪" },
  { id: "classrooms", title: "Digital Classrooms", desc: "Smart classrooms with projection systems and high-speed internet for interactive learning.", icon: "💻" },
  { id: "seminar-hall", title: "Seminar Hall", desc: "Air-conditioned seminar halls for guest lectures, workshops, and student presentations.", icon: "🎭" },
  { id: "sports", title: "Sports & Games", desc: "Outdoor playgrounds and indoor games facilities to promote physical fitness and sportsmanship.", icon: "🏆" },
  { id: "hostel", title: "Hostel Facility", desc: "Safe and comfortable residential facilities for outstation female students with proper security.", icon: "🏠" },
];

export default function FacilitiesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl">Campus Facilities</h1>
        <p className="mt-4 text-blue-200 normal-case tracking-normal">State-of-the-art infrastructure to support student growth and learning</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((f) => (
            <Link key={f.id} href={`/facilities/${f.id}`} className="block">
              <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-500 transition-all rounded-lg group text-center cursor-pointer h-full">
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">{f.icon}</div>
                <h3 className="text-xl font-bold text-college-blue mb-4 uppercase group-hover:text-blue-600">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{f.desc}</p>
                <span className="text-blue-600 font-bold text-sm">LEARN MORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
