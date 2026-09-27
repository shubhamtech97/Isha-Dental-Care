import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

export const EmergencyCare: React.FC = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white relative overflow-hidden">
      {/* Decorative pulse glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-3xl">
          {/* Text & Guidance */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wide border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Emergency Dental Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Need Urgent Dental Care?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Don't let dental pain wait. Contact our clinic for urgent dental assistance. We provide prioritized triage for acute toothaches, chipped teeth, and traumatic dental injuries.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-teal-200">
              <span className="flex items-center gap-1.5">
                <DentalIcon name="Check" className="w-3.5 h-3.5 text-teal-400" /> Severe Toothache Relief
              </span>
              <span className="flex items-center gap-1.5">
                <DentalIcon name="Check" className="w-3.5 h-3.5 text-teal-400" /> Fractured / Dislodged Tooth
              </span>
              <span className="flex items-center gap-1.5">
                <DentalIcon name="Check" className="w-3.5 h-3.5 text-teal-400" /> Acute Bleeding or Swelling
              </span>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              * Note: Contact numbers are editable placeholder details for clinic demonstration.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-base shadow-lg shadow-teal-500/20 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <DentalIcon name="Phone" className="w-5 h-5 text-slate-950" />
              <span>Call Now: {CLINIC_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=EMERGENCY%3A%20I%20have%20an%20urgent%20dental%20concern%20and%20need%20immediate%20assistance.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-colors"
            >
              <DentalIcon name="MessageCircle" className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Emergency</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
