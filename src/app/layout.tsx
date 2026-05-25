import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Government Polytechnic For Women, Guntur",
  description: "Official College Portal - Excellence in Technical Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Top Bar */}
        <div className="bg-college-blue text-white py-2 px-4 md:px-20 text-sm flex justify-between items-center">
          <div className="flex gap-6">
            <span>📞 +91 863 2234057</span>
            <span>✉️ gpwguntur@gmail.com</span>
          </div>
          <div className="hidden md:flex gap-4">
            <Link href="/admin" className="hover:underline">Admin Login</Link>
            <span>SBTET AP</span>
          </div>
        </div>

        {/* Header / Nav */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-4">
              <div className="bg-college-blue p-2 rounded-full text-white font-bold text-xl w-12 h-12 flex items-center justify-center">
                GPW
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-college-blue leading-tight">
                  GOVERNMENT POLYTECHNIC FOR WOMEN
                </h1>
                <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                  Guntur, Andhra Pradesh
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">
              <Link href="/" className="text-college-blue hover:text-blue-800">HOME</Link>
              <Link href="/about" className="hover:text-college-blue">ABOUT</Link>
              <Link href="/departments" className="hover:text-college-blue">DEPARTMENTS</Link>
              <Link href="/facilities" className="hover:text-college-blue">FACILITIES</Link>
              <Link href="/placements" className="hover:text-college-blue">PLACEMENTS</Link>
              <Link href="/contact" className="hover:text-college-blue">CONTACT</Link>
            </nav>

            <button className="lg:hidden text-college-blue p-2">
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-college-blue"></span>
                <span className="block w-6 h-0.5 bg-college-blue"></span>
                <span className="block w-6 h-0.5 bg-college-blue"></span>
              </div>
            </button>
          </div>
        </header>

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4 uppercase">Contact Us</h3>
              <p className="text-gray-400 mb-4">
                Government Polytechnic For Women,<br />
                Gujjanagundla, Guntur - 522006,<br />
                Andhra Pradesh.
              </p>
              <p className="text-gray-400">
                Phone: 0863-2234057<br />
                Email: gpwguntur@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4 uppercase">Quick Links</h3>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/admissions" className="hover:text-white">Admissions</Link></li>
                <li><Link href="/examinations" className="hover:text-white">Examinations</Link></li>
                <li><Link href="/sbtet" className="hover:text-white">SBTET Website</Link></li>
                <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4 uppercase">Committees</h3>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/grievance" className="hover:text-white">Grievance Cell</Link></li>
                <li><Link href="/anti-ragging" className="hover:text-white">Anti-Ragging Squad</Link></li>
                <li><Link href="/sc-st" className="hover:text-white">SC/ST Committee</Link></li>
                <li><Link href="/internal-complaints" className="hover:text-white">Internal Complaints</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4 uppercase">Latest News</h3>
              <div className="text-gray-400 space-y-4 text-sm">
                <div>
                  <p className="text-blue-500 font-bold">May 15, 2026</p>
                  <p>Admissions open for Academic Year 2026-27. Apply now!</p>
                </div>
                <div>
                  <p className="text-blue-500 font-bold">April 30, 2026</p>
                  <p>Semester results for April 2026 examinations released.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Government Polytechnic For Women, Guntur. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
