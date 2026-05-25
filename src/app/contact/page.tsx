export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl">Contact Us</h1>
        <p className="mt-4 text-blue-200 normal-case tracking-normal">Get in touch with our administration for any queries</p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-10 shadow-sm border border-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold text-college-blue mb-8 uppercase">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Subject" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea className="w-full p-3 border border-gray-200 rounded h-40 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Message"></textarea>
              </div>
              <button className="bg-college-blue text-white py-3 px-8 rounded font-bold hover:bg-blue-800 transition-colors uppercase tracking-widest shadow-md">Send Message</button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
              <h3 className="text-xl font-bold text-college-blue mb-6 border-l-4 border-blue-600 pl-4 uppercase">Contact Information</h3>
              <div className="space-y-6 text-gray-600">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold text-gray-800">Address</p>
                    <p>Government Polytechnic For Women, Gujjanagundla, Guntur, AP - 522006</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-bold text-gray-800">Phone</p>
                    <p>+91 9912342015</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-bold text-gray-800">Email</p>
                    <p>gpwwebguntur15@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
