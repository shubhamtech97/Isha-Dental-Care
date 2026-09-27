import React from 'react';
import { SlideData, PRESENTATION_METADATA } from '../../data/presentationData';
import { CLINIC_INFO, SERVICES_DATA, DOCTORS_DATA, TESTIMONIALS_DATA, FAQ_DATA } from '../../data/clinicData';
import { DentalIcon, ToothLogoIcon } from '../DentalIcon';

interface SlideContentProps {
  slide: SlideData;
  onNavigateToSlide?: (slideId: number) => void;
}

export const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  switch (slide.id) {
    // SLIDE 1: COVER
    case 1:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <ToothLogoIcon className="w-7 h-7 text-teal-300" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {PRESENTATION_METADATA.clientName}
                </span>
                <span className="text-xs text-teal-400 font-medium tracking-wider uppercase">
                  Website Design Proposal & Presentation
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span>{PRESENTATION_METADATA.date}</span>
              <span>·</span>
              <span>16:9 Presentation Deck</span>
            </div>
          </div>

          {/* Center Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-500/30">
                <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-teal-400" />
                <span>Executive Client Presentation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {PRESENTATION_METADATA.clientName}
              </h1>

              <p className="text-xl sm:text-2xl text-teal-200 font-light leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs max-w-xl">
                <p className="text-sm text-slate-300 leading-relaxed">
                  A high-converting, compassionate, and trustworthy healthcare website engineered to welcome new patients, articulate dental specializations, and drive direct online appointments.
                </p>
              </div>
            </div>

            {/* Mockup Preview Card on Cover */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Browser bar */}
                <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mx-auto">ishadentalcare.com</span>
                </div>
                <img
                  src="/src/assets/images/hero_dental_clinic_1790477081191.jpg"
                  alt="Isha Dental Care Website Preview"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Live Applet Preview</p>
                    <p className="text-[11px] text-teal-400">Your Smile. Our Care.</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 relative z-10">
            <p>Presented by: <strong className="text-slate-200">{PRESENTATION_METADATA.agencyName}</strong></p>
            <p>Designed for: <strong className="text-slate-200">Isha Dental Care Leadership Team</strong></p>
          </div>
        </div>
      );

    // SLIDE 2: PROJECT OVERVIEW
    case 2:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-3">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <div className="mt-4 p-5 rounded-2xl bg-teal-50/50 border border-teal-100 max-w-4xl">
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic">
                &ldquo;{slide.leadQuote}&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-auto py-6">
            {slide.keyPoints?.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                    <DentalIcon name={item.icon || 'Check'} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-semibold text-teal-700">
                  Strategic Milestone
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Core Objective: Bridge the gap between patient curiosity and clinic visits</span>
            <span>Slide 02 of 20</span>
          </div>
        </div>
      );

    // SLIDE 3: THE DESIGN CONCEPT
    case 3:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-3">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
            {/* 4 Pillars */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slide.keyPoints?.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Design Tokens & Palette */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <h4 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase">
                Visual Foundation Tokens
              </h4>
              
              {/* Palette */}
              <div className="space-y-2">
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Color System (60-30-10)</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1 text-center">
                    <div className="h-10 rounded-lg bg-white border border-slate-700" />
                    <span className="text-[10px] text-slate-300 block font-mono">White (60%)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="h-10 rounded-lg bg-slate-900 border border-slate-700" />
                    <span className="text-[10px] text-slate-300 block font-mono">Slate (30%)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="h-10 rounded-lg bg-teal-600" />
                    <span className="text-[10px] text-teal-400 block font-mono">Teal (10%)</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="h-10 rounded-lg bg-cyan-500" />
                    <span className="text-[10px] text-cyan-300 block font-mono">Cyan Light</span>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Typography Pairings</p>
                <div className="flex justify-between">
                  <span className="text-slate-300">Display / Headings:</span>
                  <strong className="text-white font-serif">Outfit & Playfair</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Body & Controls:</span>
                  <strong className="text-white">Plus Jakarta Sans</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Result: Clean medical precision without sterile intimidation</span>
            <span>Slide 03 of 20</span>
          </div>
        </div>
      );

    // SLIDE 4: HOMEPAGE EXPERIENCE
    case 4:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-center">
            {/* Visual Hero Mockup */}
            <div className="lg:col-span-7 relative">
              <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">https://ishadentalcare.com/#home</span>
                </div>
                <div className="relative">
                  <img
                    src="/src/assets/images/hero_dental_clinic_1790477081191.jpg"
                    alt="Homepage Hero Section Screenshot"
                    className="w-full h-56 sm:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-semibold text-teal-400">Hero Section Feature</span>
                    <h3 className="text-2xl font-bold">Your Smile. Our Care.</h3>
                    <p className="text-xs text-slate-200 mt-1 max-w-md">
                      Experience advanced, compassionate dental care designed to keep your smile healthy, confident, and beautiful.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Feature Highlights */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/80">
                <span className="text-xs font-bold text-teal-900 block mb-1">🎯 5-Second Goal:</span>
                <p className="text-xs sm:text-sm text-teal-800 font-medium">
                  Establish clinical excellence, warm bedside manner, and instant access to appointment booking within seconds of arrival.
                </p>
              </div>

              <div className="space-y-2.5">
                {slide.keyPoints?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <DentalIcon name="Check" className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>First Impressions: Authoritative, inviting, and uncluttered</span>
            <span>Slide 04 of 20</span>
          </div>
        </div>
      );

    // SLIDE 5: SERVICES SECTION
    case 5:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* 8 Services Grid Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-auto py-4">
            {SERVICES_DATA.map((srv, idx) => (
              <div
                key={srv.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2.5">
                    <DentalIcon name={srv.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{srv.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.shortDescription}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-teal-700 font-medium">
                  <span>{srv.typicalDuration}</span>
                  <DentalIcon name="ChevronRight" className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-teal-900 font-medium">
              💡 <strong>Interactive Feature:</strong> Every service features a detailed &ldquo;Learn More&rdquo; procedure modal outlining clinical steps, recovery expectations, and immediate booking triggers.
            </span>
            <span className="text-teal-700 font-semibold shrink-0">8 Services Displayed</span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Categorized by Preventive, Restorative, Cosmetic & Pediatric specialties</span>
            <span>Slide 05 of 20</span>
          </div>
        </div>
      );

    // SLIDE 6: WHY CHOOSE US
    case 6:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-auto py-4">
            {slide.keyPoints?.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-teal-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                  <DentalIcon name={item.icon || 'Award'} className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Addresses primary patient anxieties: Pain, Cost, Competence, Hygiene</span>
            <span>Slide 06 of 20</span>
          </div>
        </div>
      );

    // SLIDE 7: DOCTORS SECTION
    case 7:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* 3 Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
            {DOCTORS_DATA.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800">
                      {doc.experience}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-xs font-semibold text-teal-700">{doc.role}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{doc.qualification}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{doc.bio}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md block text-center">
                    {doc.specialization}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <span>⚠️ <strong>Note for Clinic:</strong> {slide.contentNote}</span>
            <span className="font-semibold text-amber-900">Customizable Content</span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Humanized authority increases appointment conversion by up to 40%</span>
            <span>Slide 07 of 20</span>
          </div>
        </div>
      );

    // SLIDE 8: APPOINTMENT BOOKING FUNNEL
    case 8:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* User Journey Pathway & Form Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
            {/* Left: Journey Flow */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Frictionless Patient Journey
              </h4>
              <div className="space-y-2.5">
                {[
                  { step: '01', title: 'Visit Website', desc: 'Discovers Isha Dental via search or recommendations' },
                  { step: '02', title: 'Explore Services', desc: 'Learns about painless procedures and doctor profiles' },
                  { step: '03', title: 'Build Trust', desc: 'Checks reviews, clinic sterilization, and transparent pricing' },
                  { step: '04', title: 'Book Appointment', desc: 'Submits preferred date, time, and service in <60 seconds' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking Form Fields Simulation */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-sm font-bold text-slate-900">Form Structure Overview</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Validated Fields
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 1</span>
                  <strong className="text-slate-800">Full Name *</strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 2</span>
                  <strong className="text-slate-800">Phone Number *</strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 3</span>
                  <strong className="text-slate-800">Email Address</strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 4</span>
                  <strong className="text-slate-800">Service Selector *</strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 5</span>
                  <strong className="text-slate-800">Preferred Date *</strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Field 6</span>
                  <strong className="text-slate-800">Preferred Time Slot *</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900">
                ✅ <strong>Instant Confirmation:</strong> Submissions display immediate feedback: <em>&ldquo;Thank you! Your appointment request has been received. Our team will contact you shortly.&rdquo;</em>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Stores requests locally and connects directly with front-desk staff</span>
            <span>Slide 08 of 20</span>
          </div>
        </div>
      );

    // SLIDE 9: MOBILE EXPERIENCE
    case 9:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Multi-Device Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-center">
            {/* Visual device frames */}
            <div className="lg:col-span-6 flex items-center justify-center gap-4">
              {/* Smartphone Frame */}
              <div className="w-48 sm:w-56 rounded-3xl border-4 border-slate-800 bg-white shadow-xl overflow-hidden p-2 text-center">
                <div className="w-12 h-3 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="bg-teal-50 p-3 rounded-xl text-left space-y-1 mb-2">
                  <span className="text-[10px] font-bold text-teal-700">🦷 Isha Dental</span>
                  <p className="text-[9px] text-slate-600 font-semibold">Your Smile. Our Care.</p>
                </div>
                <img
                  src="/src/assets/images/hero_dental_clinic_1790477081191.jpg"
                  alt="Mobile view screenshot"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <div className="p-2 bg-teal-600 text-white rounded-lg text-[10px] font-bold">
                  Book Appointment
                </div>
              </div>

              {/* Tablet Frame */}
              <div className="hidden sm:block w-72 rounded-2xl border-4 border-slate-700 bg-slate-900 shadow-xl overflow-hidden p-3 text-white">
                <div className="flex items-center justify-between text-[10px] mb-2 border-b border-slate-800 pb-1">
                  <span>Tablet 768px Fluid View</span>
                  <span className="text-teal-400">100% Responsive</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div className="bg-slate-800 p-2 rounded">
                    <strong>8 Treatments</strong>
                    <p className="text-slate-400">Adaptive Grid</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <strong>Touch Targets</strong>
                    <p className="text-slate-400">44px Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Features Checklist */}
            <div className="lg:col-span-6 space-y-3">
              {slide.keyPoints?.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <DentalIcon name="Check" className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Fast tap-to-call and WhatsApp engagement optimized for patients on the move</span>
            <span>Slide 09 of 20</span>
          </div>
        </div>
      );

    // SLIDE 10: EMERGENCY & QUICK CONTACT
    case 10:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Emergency Banner Preview Card */}
          <div className="my-auto py-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-xl border border-teal-800/60 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center md:text-left">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                    Emergency Dental Care
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Need Urgent Dental Care?
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    &ldquo;Don&apos;t let dental pain wait. Contact our clinic for urgent dental assistance.&rdquo;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="px-5 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg">
                    <DentalIcon name="Phone" className="w-4 h-4" />
                    <span>Call Now: {CLINIC_INFO.phone}</span>
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-white/10 text-white font-medium text-sm flex items-center gap-2 border border-white/20">
                    <DentalIcon name="MessageCircle" className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Quick Access Triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <DentalIcon name="Phone" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Direct Telephone</h4>
                  <p className="text-[11px] text-slate-500">Tap to call clinic reception</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <DentalIcon name="MessageCircle" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Floating WhatsApp</h4>
                  <p className="text-[11px] text-slate-500">Instant chat on all pages</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <DentalIcon name="Calendar" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Floating Booking</h4>
                  <p className="text-[11px] text-slate-500">One-click schedule anchor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Essential for trauma, sudden toothaches, and broken restorations</span>
            <span>Slide 10 of 20</span>
          </div>
        </div>
      );

    // SLIDE 11: PATIENT TRUST
    case 11:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Testimonial Cards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto py-4">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 gap-0.5 mb-2.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <DentalIcon key={i} name="Star" className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-900">{rev.author}</p>
                  <p className="text-[11px] text-teal-700 font-medium">{rev.treatment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <span>⚠️ <strong>Note for Clinic:</strong> {slide.contentNote}</span>
            <span className="font-semibold text-amber-900">Customizable Content</span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Genuine patient quotes dispel dental hesitation and confirm bedside manner</span>
            <span>Slide 11 of 20</span>
          </div>
        </div>
      );

    // SLIDE 12: FAQ SECTION
    case 12:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* 7 FAQs Preview list */}
          <div className="my-auto py-3 space-y-2 max-w-4xl">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={faq.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                </div>
                <span className="text-[11px] text-teal-700 font-medium">Accordion View</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
            <DentalIcon name="Shield" className="w-4 h-4 shrink-0 text-teal-700" />
            <span>
              <strong>Front-Desk Efficiency:</strong> Answering recurring questions online cuts down repetitive telephone inquiries by up to 35%, freeing staff to focus on in-clinic patients.
            </span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Covers checkup frequency, root canals, child dentistry, and payment flexibility</span>
            <span>Slide 12 of 20</span>
          </div>
        </div>
      );

    // SLIDE 13: CONTACT & LOCATION
    case 13:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
            {/* Contact Details List */}
            <div className="lg:col-span-6 space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <DentalIcon name="MapPin" className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Clinic Address</strong>
                  <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.address}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <DentalIcon name="Phone" className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Telephone</strong>
                  <p className="text-teal-700 font-bold text-xs mt-0.5">{CLINIC_INFO.phone}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <DentalIcon name="Mail" className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Email</strong>
                  <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <DentalIcon name="Clock" className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Operating Hours</strong>
                  <p className="text-slate-600 text-xs mt-0.5">{CLINIC_INFO.hours.weekdays}</p>
                  <p className="text-slate-600 text-xs">{CLINIC_INFO.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Map Visual Preview */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-teal-400">Interactive Location Guide</span>
                <span className="text-[11px] text-slate-400">Coral Business Centre</span>
              </div>
              <div className="bg-slate-800/90 rounded-xl p-5 border border-slate-700 space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto">
                  <DentalIcon name="MapPin" className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Isha Dental Care</h4>
                <p className="text-xs text-slate-300">Shop No. 110-11, Coral Business Centre, Near D-Mart, Jule, Solapur</p>
                <div className="pt-2">
                  <span className="text-[10px] font-semibold bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full">
                    Direct Google Maps Integration Ready
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                * Note: Final clinic contact information to be confirmed by the client before public launch.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Clearly states landmarks (D-Mart & Mhetre Tower) for hassle-free patient arrival</span>
            <span>Slide 13 of 20</span>
          </div>
        </div>
      );

    // SLIDE 14: SEO & DIGITAL FOUNDATION
    case 14:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-auto py-4">
            {slide.keyPoints?.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <DentalIcon name="ShieldCheck" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span>🛡️ <strong>Compliance:</strong> Fully compliant with modern web accessibility (WCAG AA) and mobile search standards.</span>
            <span className="font-semibold text-slate-800">Structured Data Included</span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Clean code ensures rapid page loads even on standard 4G mobile connections</span>
            <span>Slide 14 of 20</span>
          </div>
        </div>
      );

    // SLIDE 15: WEBSITE USER JOURNEY
    case 15:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Visual Step-by-Step Pathway Diagram */}
          <div className="my-auto py-6">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2.5 items-center">
              {[
                { title: '1. Discovery', sub: 'Google & Social', icon: 'Sparkles', color: 'bg-slate-100 text-slate-700' },
                { title: '2. Landing', sub: 'Homepage First Look', icon: 'Award', color: 'bg-teal-50 text-teal-800' },
                { title: '3. Explore', sub: 'Dental Services', icon: 'Cpu', color: 'bg-teal-50 text-teal-800' },
                { title: '4. Trust', sub: 'Hygiene & Philosophy', icon: 'ShieldCheck', color: 'bg-teal-100 text-teal-800' },
                { title: '5. People', sub: 'Doctors & Reviews', icon: 'UserCheck', color: 'bg-teal-100 text-teal-900' },
                { title: '6. Action', sub: 'Book Appointment', icon: 'Calendar', color: 'bg-teal-600 text-white' },
                { title: '7. Arrival', sub: 'Clinic Visit', icon: 'MapPin', color: 'bg-slate-900 text-white' },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 font-bold ${step.color}`}>
                    <DentalIcon name={step.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Every component serves a specific role in converting skepticism into scheduled care</span>
            <span>Slide 15 of 20</span>
          </div>
        </div>
      );

    // SLIDE 16: BUSINESS VALUE
    case 16:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-auto py-4">
            {slide.keyPoints?.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-teal-200 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>A long-term digital asset that grows with the clinic practice</span>
            <span>Slide 16 of 20</span>
          </div>
        </div>
      );

    // SLIDE 17: CONTENT THAT CAN BE CUSTOMIZED
    case 17:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* 12 Customizable Elements Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-auto py-4">
            {[
              'Doctor Names & Profiles',
              'Clinic Photography',
              'Services & Pricing',
              'Telephone Numbers',
              'Email Addresses',
              'Street Address & Map',
              'Weekly Opening Hours',
              'Patient Testimonials',
              'Experience Statistics',
              'Social Media Links',
              'Branding Colors',
              'Logo & Tooth Icon',
            ].map((element, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2.5 text-xs font-medium text-slate-800">
                <DentalIcon name="Check" className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{element}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            ⚠️ <strong>Notice for Clinic Leadership:</strong> {slide.contentNote}
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Centralized data structure ensures zero code modification required for text updates</span>
            <span>Slide 17 of 20</span>
          </div>
        </div>
      );

    // SLIDE 18: FINAL WEBSITE PREVIEW
    case 18:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Showcase Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-2 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-700 block mb-1">Operatory & Clinic Suite</span>
              <img
                src="/src/assets/images/about_dental_practice_1790477096873.jpg"
                alt="Clinic Interior"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-2 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-700 block mb-1">Lead Dentist Consultation</span>
              <img
                src="/src/assets/images/doctor_priya_sharma_1790477108147.jpg"
                alt="Dr. Priya Sharma"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-2 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-700 block mb-1">Cosmetic & Pediatric Specialists</span>
              <img
                src="/src/assets/images/doctor_ananya_patel_1790477131997.jpg"
                alt="Dr. Ananya Patel"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-600 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold">A modern, trustworthy and patient-focused digital presence for Isha Dental Care.</p>
              <p className="text-xs text-teal-100">Fully developed, responsive, and available for live interactive review.</p>
            </div>
            <span className="text-xs font-bold bg-white text-teal-800 px-4 py-2 rounded-xl shadow-xs shrink-0">
              Approved Prototype
            </span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Seamlessly transitions from high-level branding to individual appointment bookings</span>
            <span>Slide 18 of 20</span>
          </div>
        </div>
      );

    // SLIDE 19: NEXT STEPS
    case 19:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 bg-white text-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md w-fit mb-2">
              <span>{slide.category}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {slide.leadQuote}
            </p>
          </div>

          {/* Simple Client Approval Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-auto py-4">
            {[
              'Confirm final clinic information & legal name',
              'Confirm doctor profiles & credentials',
              'Add final clinic interior photographs',
              'Confirm services & pricing ranges',
              'Add verified patient testimonials',
              'Confirm WhatsApp & telephone details',
              'Connect final domain (e.g. ishadentalcare.com)',
              'Conduct cross-device final testing',
              'Official Website Public Launch',
            ].map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                <div className="w-5 h-5 rounded-md border-2 border-teal-600 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-sm bg-teal-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">{step}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
            <span>📋 <strong>Handover Support:</strong> Our team is ready to update all final content blocks within 24 hours of receiving clinic approvals.</span>
            <span className="font-semibold text-teal-800">Action Plan Ready</span>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Estimated time to go live post-content approval: 2–3 business days</span>
            <span>Slide 19 of 20</span>
          </div>
        </div>
      );

    // SLIDE 20: THANK YOU
    case 20:
      return (
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <ToothLogoIcon className="w-6 h-6 text-teal-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {PRESENTATION_METADATA.clientName}
              </span>
            </div>
            <span className="text-xs font-mono text-teal-400 bg-white/5 px-3 py-1 rounded-md">
              &ldquo;Your Smile. Our Care.&rdquo;
            </span>
          </div>

          {/* Central Thank You Block */}
          <div className="my-auto py-8 text-center max-w-2xl mx-auto space-y-5 relative z-10">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center mx-auto shadow-lg">
              <DentalIcon name="Smile" className="w-9 h-9" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Thank You
            </h2>

            <p className="text-xl text-teal-200 font-light">
              Questions & Feedback
            </p>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              We look forward to hearing your thoughts on the design, content, and patient flow. Let&apos;s finalize the details and launch your new digital practice!
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <DentalIcon name="Phone" className="w-3.5 h-3.5 text-teal-400" />
                <span>Clinic Telephone: {CLINIC_INFO.phone}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <DentalIcon name="Mail" className="w-3.5 h-3.5 text-teal-400" />
                <span>{CLINIC_INFO.email}</span>
              </span>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 relative z-10">
            <p>Presentation prepared by: <strong className="text-slate-200">{PRESENTATION_METADATA.agencyName}</strong></p>
            <p>Digital Healthcare Design & Web Engineering</p>
          </div>
        </div>
      );

    default:
      return <div>Slide not found</div>;
  }
};
