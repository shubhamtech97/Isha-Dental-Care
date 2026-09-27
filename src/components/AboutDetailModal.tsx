import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface AboutDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

export const AboutDetailModal: React.FC<AboutDetailModalProps> = ({
  isOpen,
  onClose,
  onBook,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <DentalIcon name="X" className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
            <DentalIcon name="ShieldCheck" className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Clinical Philosophy & Standards
            </span>
            <h3 className="text-2xl font-bold text-slate-900">About Isha Dental Clinic</h3>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-600">
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Our Mission</h4>
            <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              At Isha Dental Care, our primary mission is to deliver exceptional, painless oral healthcare tailored to patients of all generations. We combine contemporary dental sciences with empathetic communication so you always feel informed, respected, and comfortable.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-slate-900">Our 4 Pillars of Excellence</h4>
            
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                1. Six-Step Sterilization & Infection Control
              </h5>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                Every instrument undergoes ultrasonic cavitation, hospital-grade packaging, and high-pressure vacuum autoclaving for zero cross-contamination.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                2. Digital Low-Dose Radiography
              </h5>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                Modern intraoral digital sensors reduce radiation exposure by up to 80% compared to traditional film, offering crystal-clear chairside diagnosis.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                3. Gentle, Anxiety-Free Dental Techniques
              </h5>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                Topical anesthetic pre-gels, ultra-fine delivery needles, and gentle bedside pacing ensure that even nervous patients feel at ease.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                4. Transparent Pricing & Informed Consent
              </h5>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                We clearly walk you through all clinical options, materials, step-by-step procedures, and fees before initiating any treatment.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900">
            <strong>Facility Location:</strong> Coral Business Centre, Near D-Mart, Beside Mhetre Tower, Jule, Solapur. Complete parking and wheelchair elevator facilities available on site.
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <DentalIcon name="Calendar" className="w-3.5 h-3.5" />
            <span>Book a Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
