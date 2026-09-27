import React, { useState } from 'react';
import { DOCTORS_DATA, Doctor } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface DoctorsProps {
  onBookWithDoctor: (doctorName: string) => void;
}

export const Doctors: React.FC<DoctorsProps> = ({ onBookWithDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="UserCheck" className="w-3.5 h-3.5" />
            <span>Clinical Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Dental Experts
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Dedicated practitioners dedicated to continuing dental education, gentle clinical care, and patient comfort.
          </p>

          <p className="mt-2 text-xs text-slate-400 italic">
            * Doctor profiles and credentials are demo/placeholder entries that are fully customizable.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS_DATA.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Portrait Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.role}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Experience Badge on Photo */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-900 border border-slate-100 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>{doctor.experience}</span>
                  </div>

                  {/* Social / Consultation Icon */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <a
                      href="#appointment"
                      onClick={(e) => {
                        e.preventDefault();
                        onBookWithDoctor(doctor.name);
                      }}
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-teal-600 flex items-center justify-center shadow-xs transition-colors"
                      title={`Book consultation with ${doctor.name}`}
                    >
                      <DentalIcon name="Calendar" className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">
                      {doctor.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {doctor.qualification}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-4">
                    <span className="font-semibold text-slate-800">Specialization: </span>
                    {doctor.specialization}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {doctor.bio}
                  </p>

                  {/* Focus Areas */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Clinical Focus
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.areasOfExpertise.map((area, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(doctor)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-medium text-center transition-colors cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => onBookWithDoctor(doctor.name)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold text-center shadow-xs transition-colors cursor-pointer"
                >
                  Book Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <DentalIcon name="X" className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shrink-0 border border-slate-200"
              />
              <div className="space-y-1">
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {selectedDoctor.experience}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{selectedDoctor.name}</h3>
                <p className="text-sm font-semibold text-teal-800">{selectedDoctor.role}</p>
                <p className="text-xs text-slate-500">{selectedDoctor.qualification}</p>
                <p className="text-xs text-slate-600 pt-1">
                  <strong>Consultation Timing:</strong> {selectedDoctor.schedule}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Biography & Philosophy</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Clinical Specializations & Procedures</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDoctor.areasOfExpertise.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <DentalIcon name="Check" className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const docName = selectedDoctor.name;
                  setSelectedDoctor(null);
                  onBookWithDoctor(docName);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Book with {selectedDoctor.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
