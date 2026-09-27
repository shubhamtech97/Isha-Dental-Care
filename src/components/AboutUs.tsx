import React, { useState } from 'react';
import { CLINIC_STATS, CLINIC_INFO } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface AboutUsProps {
  onLearnMore: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image & Experience Badge Column */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
              <img
                src="/src/assets/images/about_dental_practice_1790477096873.jpg"
                alt="Modern consultation suite at Isha Dental Clinic"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-4/3 transform hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block text-xs font-semibold tracking-wider uppercase bg-teal-600/90 backdrop-blur-xs px-2.5 py-1 rounded-md mb-2">
                  Compassionate Patient Care
                </span>
                <p className="text-sm font-medium text-slate-100">
                  Engineered for gentle treatments, sterile clinical safety, and anxious patient reassurance.
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -right-3 sm:-right-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-3.5 max-w-[260px]">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <DentalIcon name="Award" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 leading-tight">10+ Years</p>
                <p className="text-xs text-slate-500">Dedicated Dental Excellence in Solapur & Pune region</p>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
              <DentalIcon name="ShieldCheck" className="w-3.5 h-3.5" />
              <span>About Isha Dental Clinic</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Comprehensive, Modern Dental Wellness for Children & Adults
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              At <strong className="text-slate-900 font-semibold">{CLINIC_INFO.name}</strong>, we believe every patient deserves a radiant, healthy smile built upon a foundation of trust, gentle care, and cutting-edge dentistry. We provide end-to-end oral healthcare under one welcoming roof.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <DentalIcon name="Check" className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Preventive Care & Oral Hygiene Education</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Preserving your natural teeth through regular examinations, prophylaxis, and custom home hygiene guidance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <DentalIcon name="Check" className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Aesthetic Cosmetic & Restorative Dentistry</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Smile design veneers, tooth-colored restorations, dental implants, and rotary endodontics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <DentalIcon name="Check" className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Modern Technology & Personalized Treatment Plans</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Low-dose digital imaging, ultrasonic precision, and transparent treatment roadmaps tailored to your needs.</p>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                {CLINIC_STATS.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center sm:text-left italic">
                * Note: Statistics shown above represent sample editable placeholder metrics for demonstration.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <span>Learn More About Us</span>
                <DentalIcon name="ArrowRight" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
