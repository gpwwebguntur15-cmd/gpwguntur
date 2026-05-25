import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-college-blue py-16 text-white text-center">
        <h1 className="text-4xl font-bold uppercase tracking-widest">About Our Institution</h1>
        <p className="mt-4 text-blue-200">Excellence in Technical Education for Women since 1967</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-college-blue mb-6 border-l-4 border-blue-600 pl-4 uppercase">Our History</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Government Polytechnic For Women, Guntur, was established in 1967 with the noble vision of empowering women through quality technical education. Over the decades, it has grown into a premier institution, nurturing thousands of skilled professionals who contribute significantly to the engineering and technology sectors.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Affiliated to the State Board of Technical Education and Training (SBTET), Andhra Pradesh, and approved by AICTE, the polytechnic offers diploma programs that blend theoretical knowledge with hands-on practical experience in state-of-the-art laboratories.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src="/images/media__1778908869443.jpg" alt="College Campus" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 shadow-md border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-college-blue mb-4 uppercase">Our Values</h3>
            <p className="text-gray-500 text-sm">Integrity, Innovation, and Excellence are at the core of everything we do. We strive to create a culture of continuous learning and mutual respect.</p>
          </div>
          <div className="bg-white p-8 shadow-md border-t-4 border-pink-600">
            <h3 className="text-xl font-bold text-college-blue mb-4 uppercase">Empowerment</h3>
            <p className="text-gray-500 text-sm">We are dedicated to providing women with the tools and confidence to lead in male-dominated technical fields.</p>
          </div>
          <div className="bg-white p-8 shadow-md border-t-4 border-yellow-600">
            <h3 className="text-xl font-bold text-college-blue mb-4 uppercase">Community</h3>
            <p className="text-gray-500 text-sm">Fostering a strong network of alumni, industry partners, and dedicated faculty to support our students' growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
