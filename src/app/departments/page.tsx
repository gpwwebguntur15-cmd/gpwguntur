import Link from "next/link";

export default function DepartmentsPage() {
  const departments = [
    { id: "ece", name: "Electronics And Communication Engineering", desc: "Communication systems & circuit design.", icon: "📡" },
    { id: "ccp", name: "Commercial And Computer Practice", desc: "Modern commerce, accounting, and computer practice skills.", icon: "📊" },
    { id: "adft", name: "ADFT", desc: "Apparel Design and Fashion Technology for creative designers.", icon: "👗" },
    { id: "pharmacy", name: "Pharmacy", desc: "Pharmaceutical sciences, chemistry, and clinical practice.", icon: "💊" },
    { id: "general", name: "General Section", desc: "Foundational mathematics, sciences, and English humanities.", icon: "🧪" },
    { id: "office", name: "Office administration", desc: "Institutional management, records, and administration services.", icon: "🏢" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl">Academic Departments</h1>
        <p className="mt-4 text-blue-200 normal-case">Specialized technical training across various disciplines</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {departments.map((dept) => (
            <Link key={dept.id} href={`/department/${dept.id}`} className="group block bg-white border border-gray-200 p-10 hover:bg-college-blue transition-all duration-300 shadow-sm hover:shadow-xl rounded-lg h-full flex flex-col justify-between">
              <div>
                <div className="text-6xl mb-8 text-center group-hover:scale-110 transition-transform">{dept.icon}</div>
                <h3 className="text-2xl font-bold text-college-blue mb-4 text-center group-hover:text-white uppercase tracking-tight">{dept.name}</h3>
                <p className="text-gray-500 group-hover:text-blue-100 mb-8 text-center leading-relaxed text-sm">{dept.desc}</p>
              </div>
              <div className="text-center mt-auto">
                <span className="inline-block border-2 border-college-blue text-college-blue font-bold px-6 py-2 group-hover:border-white group-hover:text-white uppercase text-xs tracking-widest">View Faculty →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
