"use client";

import { useState } from "react";

interface CampusEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  desc: string;
  longDesc: string;
  images: {
    src: string;
    caption: string;
  }[];
}

export default function EventsPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const eventsList: CampusEvent[] = [
    {
      id: "alumni-meet-2026",
      title: "Annual Alumni Meet & Felicitation Ceremony",
      date: "May 10, 2026",
      category: "Alumni",
      desc: "Distinguished alumni gathering to share experiences, support engineering students, and honor teachers.",
      longDesc: "Government Polytechnic for Women, Guntur hosted its Annual Alumni Meet, bringing together past graduates to share their professional journeys and inspire current students. A major highlight of the event was the felicitation of distinguished alumni and retired senior faculty members for their outstanding contributions to the institution. The alumni association also gathered to contribute resources and discuss mentorship opportunities for the engineering students, concluding with a memorable cultural gathering.",
      images: [
        {
          src: "/images/alumni_meet_new_a.jpg",
          caption: "Felicitation Ceremony: Honoring senior faculty members with traditional shawls and mementos."
        },
        {
          src: "/images/alumni_meet_5.jpg",
          caption: "Guest of Honor: Honoring alumni achievements during the presentation ceremony."
        },
        {
          src: "/images/alumni_meet_new_b.jpg",
          caption: "Honoring Teachers: Celebrating retired faculty during the Alumni Gathering."
        },
        {
          src: "/images/alumni_meet_8.jpg",
          caption: "Alumni Address: Former graduates sharing career insights and industry wisdom with students."
        },
        {
          src: "/images/alumni_meet_6.jpg",
          caption: "Felicitation Ceremony: Faculty expressing gratitude to our guest of honor."
        },
        {
          src: "/images/alumni_meet_7.jpg",
          caption: "Token of Respect: Presenting shawls to retired professors during the ceremony."
        }
      ]
    },
    {
      id: "library-awards-2026",
      title: "Library Awards & Recognition Ceremony",
      date: "May 25, 2026",
      category: "Library",
      desc: "Recognizing outstanding student readers, digital library achievers, and academic excellence.",
      longDesc: "Government Polytechnic for Women, Guntur hosted a Library Awards & Recognition Ceremony to celebrate students who demonstrated exceptional academic diligence and active participation in library reading initiatives. Trophies and certificates of merit were presented to top students by the Principal and guest dignitaries. This initiative aims to encourage self-directed learning, digital literacy, and regular library research among the students.",
      images: [
        {
          src: "/images/library_award_1.jpg",
          caption: "Award Achievers: Students proudly presenting their trophies and certificates with faculty heads."
        },
        {
          src: "/images/library_award_3.jpg",
          caption: "Presentation Ceremony: Guest officials presenting merit awards to students on stage."
        },
        {
          src: "/images/library_award_2.jpg",
          caption: "Academic Recognition: Celebrating library achievers alongside the faculty coordinators."
        },
        {
          src: "/images/library_award_4.jpg",
          caption: "Felicitation Stage: Celebrating student accomplishments during the library recognition meet."
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-college-blue py-16 text-white text-center uppercase tracking-widest font-bold">
        <h1 className="text-4xl tracking-wider">Campus Events</h1>
        <div className="w-16 h-1 bg-pink-500 mx-auto mt-3"></div>
        <p className="mt-4 text-blue-200 normal-case tracking-normal text-sm md:text-base max-w-2xl mx-auto px-4">
          Capturing the vibrant moments, extra-curricular accomplishments, and community campaigns at Government Polytechnic for Women.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-16">
        <div className="space-y-16">
          {eventsList.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-8 md:p-10">
                {/* Event Tag & Date */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {event.category}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold">
                    📅 {event.date}
                  </span>
                </div>

                {/* Event Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-college-blue mb-4 uppercase tracking-tight">
                  {event.title}
                </h2>
                
                {/* Event Description */}
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8 max-w-4xl">
                  {event.longDesc}
                </p>

                {/* Event Image Gallery */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    Event Gallery & Media
                  </h3>
                  
                  <div className={`grid grid-cols-1 ${
                    event.images.length === 1 
                      ? "max-w-2xl" 
                      : event.images.length === 2 
                        ? "md:grid-cols-2" 
                        : "md:grid-cols-3"
                  } gap-8`}>
                    {event.images.map((img, index) => (
                      <div 
                        key={index} 
                        className="group cursor-pointer" 
                        onClick={() => setSelectedImg(img.src)}
                      >
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 aspect-[16/10] relative">
                          <img 
                            src={img.src} 
                            alt={img.caption} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-college-blue px-4 py-2 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">
                              Zoom Image 🔍
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 italic leading-relaxed text-center px-4">
                          {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in cursor-pointer"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button 
              className="absolute top-[-40px] right-0 text-white font-bold text-2xl hover:text-pink-500 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              ✕ CLOSE
            </button>
            <img 
              src={selectedImg} 
              alt="Zoomed Event View" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-white/10" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
