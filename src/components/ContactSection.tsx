import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="MapPin" className="w-3.5 h-3.5" />
            <span>Clinic Location & Hours</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Dental Clinic
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Conveniently situated in Coral Business Centre with ample patient parking and elevator access.
          </p>

          <p className="mt-2 text-xs text-slate-400 italic">
            * Note: Address and contact numbers are editable placeholder details for clinic demonstration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
                  <DentalIcon name="MapPin" className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Clinic Address</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <DentalIcon name="Check" className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <DentalIcon name="Sparkle" className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                    <span className="text-slate-300">·</span>
                    <a
                      href={CLINIC_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-teal-700 inline-flex items-center gap-1"
                    >
                      <span>Open in Maps</span>
                      <DentalIcon name="ExternalLink" className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
                  <DentalIcon name="Phone" className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Phone Numbers</h3>
                  <p className="text-xs text-slate-500">Reception & Consultation Enquiries:</p>
                  <a
                    href={`tel:${CLINIC_INFO.phoneRaw}`}
                    className="text-base sm:text-lg font-bold text-teal-700 hover:text-teal-800 transition-colors block"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <p className="text-xs text-slate-400">Available during operating hours for quick bookings.</p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
                  <DentalIcon name="Mail" className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Email Address</h3>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors block"
                  >
                    {CLINIC_INFO.email}
                  </a>
                  <p className="text-xs text-slate-400">For reports, treatment estimates & insurance claims.</p>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
                  <DentalIcon name="Clock" className="w-6 h-6" />
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Opening Hours</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open Today
                    </span>
                  </div>
                  <div className="text-sm text-slate-700 space-y-1 pt-1">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 text-xs sm:text-sm">
                      <span className="font-medium text-slate-600">Monday – Saturday</span>
                      <span className="font-bold text-slate-900 font-mono">9:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-xs sm:text-sm">
                      <span className="font-medium text-slate-600">Sunday</span>
                      <span className="font-bold text-amber-700 font-mono">10:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Area */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col h-full">
              {/* Top Map Bar */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-semibold tracking-wide">Interactive Location Guide</span>
                </div>
                <span className="text-[11px] text-slate-400">Landmark: Near D-Mart & Mhetre Tower</span>
              </div>

              {/* Styled Map Container */}
              <div className="relative flex-1 min-h-[360px] lg:min-h-[440px] bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                {/* Visual Map Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `radial-gradient(#0d9488 0.75px, transparent 0.75px), radial-gradient(#cbd5e1 0.75px, #f8fafc 0.75px)`,
                    backgroundSize: '30px 30px',
                    backgroundPosition: '0 0, 15px 15px',
                  }}
                />

                {/* Simulated Road network */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#64748b" strokeWidth="12" />
                    <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#64748b" strokeWidth="16" />
                    <line x1="10%" y1="90%" x2="90%" y2="10%" stroke="#94a3b8" strokeWidth="8" />
                  </svg>
                </div>

                {/* Location Marker Card */}
                <div className="relative z-10 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-200 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <DentalIcon name="MapPin" className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{CLINIC_INFO.name}</h4>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">Coral Business Centre · Suite 110-11</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Convenient roadside access, elevator in main lobby, wheelchair friendly entrance.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href={CLINIC_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <DentalIcon name="ArrowRight" className="w-3.5 h-3.5" />
                      <span>Get Driving Directions</span>
                    </a>
                    <a
                      href={`tel:${CLINIC_INFO.phoneRaw}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                    >
                      <DentalIcon name="Phone" className="w-3.5 h-3.5 text-teal-600" />
                      <span>Call for Guide</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-slate-400">
                    * Interactive demonstration map area. Click Get Driving Directions to navigate via Google Maps.
                  </p>
                </div>
              </div>

              {/* Map Footer Landmarks */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
                <div>
                  <span className="font-bold text-slate-800 block">D-Mart Jule</span>
                  <span className="text-[11px] text-slate-400">2 min walk</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Mhetre Tower</span>
                  <span className="text-[11px] text-slate-400">Right beside</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Parking</span>
                  <span className="text-[11px] text-slate-400">Dedicated bays</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
