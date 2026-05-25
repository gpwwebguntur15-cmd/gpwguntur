export default function PlacementsPage() {
  const stats = [
    { label: "Placement Rate", value: "85%" },
    { label: "Companies Visited", value: "45+" },
    { label: "Highest Package", value: "8 LPA" },
    { label: "Average Package", value: "4.5 LPA" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl">Training & Placements</h1>
        <p className="mt-4 text-blue-200 normal-case tracking-normal">Bridging the gap between academic learning and industry requirements</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-8 text-center border-b-4 border-blue-600 shadow-sm">
              <p className="text-4xl font-bold text-college-blue mb-2">{s.value}</p>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 shadow-sm border border-gray-100 rounded-lg mb-20">
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
    </div>
  );
}
