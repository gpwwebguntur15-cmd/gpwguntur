"use client";

import Link from "next/link";

export default function AboutPage() {
  const courses = [
    {
      no: 1,
      name: "Diploma in Electronics and Communication Engineering (DECE)",
      intake: 66,
      duration: "3 Years",
      employability: "Supervisors in Electronic Industries, Corporations like ECIL, A.I.R., Telecommunication Companies etc."
    },
    {
      no: 2,
      name: "Diploma in Commercial and Computer Practice (DCCP)",
      intake: 66,
      duration: "3 Years",
      employability: "Stenographers in State Legislative Assembly, Courts, Data Entry Operators, Office Assistants in various Public and Private Organizations etc."
    },
    {
      no: 3,
      name: "Diploma in Apparel Design & Fashion Technology (AD & FT)",
      intake: 22,
      duration: "3 Years",
      employability: "Fashion Designers, Supervisors in Textile Industries and Self-employed."
    },
    {
      no: 4,
      name: "Diploma in Pharmacy (D.Ph.)",
      intake: 66,
      duration: "2 Years",
      employability: "Pharmacists in Govt. Hospitals and Medical Shops"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-20">
      {/* Banner */}
      <div className="bg-college-blue py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">About Our Institution</h1>
        <div className="w-24 h-1.5 bg-pink-500 mx-auto mb-4"></div>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto px-4">
          Government Polytechnic for Women, Guntur — Empowering girls through quality Technical Education since 1968.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-16">
        
        {/* Section 1: History & Inauguration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-college-blue uppercase tracking-tight border-l-4 border-blue-600 pl-4">
              Our Rich Legacy
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Since the inception of freedom, there has been a recognized need to foster opportunities for girls in the realm of Technical Education, ensuring that their skills, abilities, and ingenuity are not left untapped. With the noble objective of providing technical education and training to the girls of Andhra Pradesh, Government Polytechnics exclusively for female students were established.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              The <strong>Government Polytechnic for Women in Guntur</strong> stands as the third of its kind in the state, founded in July 1968. The primary aim was to empower girls to become valuable contributors to their families and society.
            </p>
            <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-gray-800 font-semibold italic text-base">
                "The institution was formally inaugurated on October 7, 1968, by the then honourable Chief Minister, Sri K. Brahmananda Reddy, with the Hostel Buildings being inaugurated by Smt. Raghavamma Brahmananda Reddy."
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img src="/images/media__1778908869443.jpg" alt="College Campus Inauguration" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>

        {/* Section 2: Core Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-150 border-t-4 border-blue-600 text-center">
            <span className="text-4xl block mb-3">📍</span>
            <h4 className="text-lg font-bold text-college-blue uppercase mb-2">Campus Area</h4>
            <p className="text-gray-600 font-medium">9.1 Acres in the heart of Guntur (Gujjanagundla area)</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-150 border-t-4 border-pink-600 text-center">
            <span className="text-4xl block mb-3">🎓</span>
            <h4 className="text-lg font-bold text-college-blue uppercase mb-2">Qualified Faculty</h4>
            <p className="text-gray-600 font-medium">25 highly qualified staff (Doctorate, M.Tech, M.Pharm, PG)</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-150 border-t-4 border-yellow-500 text-center">
            <span className="text-4xl block mb-3">🏢</span>
            <h4 className="text-lg font-bold text-college-blue uppercase mb-2">Support Staff</h4>
            <p className="text-gray-600 font-medium">17 dedicated non-teaching staff members</p>
          </div>
        </div>

        {/* Section 3: Courses Offered */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-8 md:p-12 mb-24">
          <h2 className="text-2xl font-bold text-college-blue uppercase tracking-wider mb-8 border-l-4 border-blue-600 pl-4">
            Courses Offered
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-150 text-college-blue uppercase text-xs font-bold tracking-wider">
                  <th className="p-4 border border-gray-200 w-12 text-center">Sl.No.</th>
                  <th className="p-4 border border-gray-200">Course</th>
                  <th className="p-4 border border-gray-200 text-center w-24">Intake</th>
                  <th className="p-4 border border-gray-200 text-center w-32">Duration</th>
                  <th className="p-4 border border-gray-200">Employability / Future Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {courses.map((c) => (
                  <tr key={c.no} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border border-gray-200 font-bold text-center">{c.no}</td>
                    <td className="p-4 border border-gray-200 font-bold text-gray-900">{c.name}</td>
                    <td className="p-4 border border-gray-200 text-center font-bold text-blue-600">{c.intake}</td>
                    <td className="p-4 border border-gray-200 text-center">{c.duration}</td>
                    <td className="p-4 border border-gray-200 leading-relaxed">{c.employability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-pink-600 font-semibold italic">
            * Students undergo Industrial Training for a period of 6 months in their final year study as part of the Curriculum.
          </p>
        </div>

        {/* Section 4: Infrastructure & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Infrastructure List */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-150">
            <h3 className="text-2xl font-bold text-college-blue uppercase mb-8 border-l-4 border-blue-600 pl-4">
              Infrastructure Details
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-lg">📏</span>
                <div>
                  <h4 className="font-bold text-gray-800">Spacious Campus</h4>
                  <p className="text-gray-600 text-sm mt-1">Situated on 9.1 acres of land in the heart of Guntur city (Gujjanagundla area).</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-lg">🏢</span>
                <div>
                  <h4 className="font-bold text-gray-800">Modern & Old Building Blocks</h4>
                  <p className="text-gray-600 text-sm mt-1">Accommodates different academic departments, spacious classrooms, and library facilities.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-lg">🧪</span>
                <div>
                  <h4 className="font-bold text-gray-800">Equipped Laboratories</h4>
                  <p className="text-gray-600 text-sm mt-1">Well-designed laboratories with relevant equipment for every department to provide hands-on experience.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-lg">🏠</span>
                <div>
                  <h4 className="font-bold text-gray-800">On-Campus Hostel</h4>
                  <p className="text-gray-600 text-sm mt-1">Secure on-campus hostel block accommodating up to 200 girl students safely.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Achievements list */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-150">
            <h3 className="text-2xl font-bold text-college-blue uppercase mb-8 border-l-4 border-pink-600 pl-4">
              Major Achievements
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <span className="bg-pink-100 text-pink-700 p-2 rounded-lg text-lg">🌟</span>
                <div>
                  <h4 className="font-bold text-gray-800">NBA Accredited ECE Course</h4>
                  <p className="text-gray-600 text-sm mt-1">The Electronics and Communications course is accredited by the National Board of Accreditation for a period of 3 years from 2023-24.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-pink-100 text-pink-700 p-2 rounded-lg text-lg">🏆</span>
                <div>
                  <h4 className="font-bold text-gray-800">Best Placement Record Award</h4>
                  <p className="text-gray-600 text-sm mt-1">Awarded with the BEST PLACEMENT RECORD at the State Level in the year 2023.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-pink-100 text-pink-700 p-2 rounded-lg text-lg">🥇</span>
                <div>
                  <h4 className="font-bold text-gray-800">Sports & Game Dominance</h4>
                  <p className="text-gray-600 text-sm mt-1">Successfully conducted the Inter Polytechnic Sports & Games Regional Meet for Girls in 2022-23 and 2023-24.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5: MOUs & Collaborations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-college-blue uppercase tracking-wider mb-4 border-l-4 border-yellow-500 pl-4">
            Industrial Collaborations (MOUs)
          </h2>
          <p className="text-gray-600 mb-8 text-base">
            The institute maintains active MOUs (Memorandums of Understanding) with leading organizations for imparting industrial training to the V Semester students:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-college-blue text-lg mb-2">Vamani Overseas Private Limited</h4>
              <p className="text-gray-500 text-sm">Guntur, Andhra Pradesh</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-college-blue text-lg mb-2">Techbium Software Solutions</h4>
              <p className="text-gray-500 text-sm">Guntur, Andhra Pradesh</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-college-blue text-lg mb-2">M/S Girija Enterprises</h4>
              <p className="text-gray-500 text-sm">Guntur, Andhra Pradesh</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
