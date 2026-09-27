import React from 'react';
import { CLINIC_INFO, TRUST_POINTS } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50">
      {/* Subtle background ambient blur spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Domain-authentic kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-teal-800 bg-teal-100/80 px-3.5 py-1.5 rounded-full shadow-xs">
              <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-teal-600" />
              <span>Comprehensive Family & Cosmetic Dentistry</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Your Smile.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                Our Care.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {CLINIC_INFO.subheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-base shadow-sm shadow-teal-700/25 hover:shadow-md transition-all duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <DentalIcon name="Calendar" className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform" />
                <span>Book an Appointment</span>
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-semibold text-base border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <span>Explore Our Services</span>
                <DentalIcon name="ArrowRight" className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                Patient Quality Assurances
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2">
                {TRUST_POINTS.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-left">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <DentalIcon name="Check" className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Dental Clinic Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gradient border card */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-teal-500/20 via-slate-100 to-cyan-500/20 shadow-xl shadow-slate-200/60">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-slate-100">
                  <img
                    src="/src/assets/images/hero_dental_clinic_1790477081191.jpg"
                    alt="Modern Isha Dental Care operatory and diagnostic suite"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* On-image caption badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                        <DentalIcon name="ShieldCheck" className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">ISO & NABH Grade Sterilization</p>
                        <p className="text-[11px] text-slate-500">100% Autoclaved & Touch-Free Protocols</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <DentalIcon name="Star" className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-slate-900">4.9 / 5.0</span>
                    <span className="text-[11px] text-slate-400">(500+ reviews)</span>
                  </div>
                  <p className="text-xs text-slate-500">Exceptional Patient Trust</p>
                </div>
              </div>

              {/* Floating hours badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-md border border-slate-100 items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-slate-800">Walk-ins & Appointments Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
