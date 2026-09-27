import React, { useState } from 'react';
import { SERVICES_DATA, DentalService } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface ServicesProps {
  onSelectService: (service: DentalService) => void;
  onBookService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onBookService }) => {
  const [filter, setFilter] = useState<'all' | 'preventive' | 'restorative' | 'cosmetic'>('all');

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (filter === 'preventive') {
      return ['general-dentistry', 'teeth-cleaning', 'pediatric-dentistry'].includes(service.id);
    }
    if (filter === 'restorative') {
      return ['root-canal-treatment', 'dental-implants', 'general-dentistry'].includes(service.id);
    }
    if (filter === 'cosmetic') {
      return ['teeth-whitening', 'cosmetic-dentistry', 'braces-aligners'].includes(service.id);
    }
    return true;
  });

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="Sparkles" className="w-3.5 h-3.5" />
            <span>Comprehensive Clinical Care</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Dental Services
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Tailored dental treatments using gentle techniques and modern clinical equipment for your long-term oral wellness.
          </p>

          {/* Interactive filter tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            <button
              onClick={() => setFilter('preventive')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'preventive'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Preventive
            </button>
            <button
              onClick={() => setFilter('restorative')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'restorative'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Restorative & Implants
            </button>
            <button
              onClick={() => setFilter('cosmetic')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'cosmetic'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cosmetic & Braces
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <DentalIcon name={service.icon} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                  <DentalIcon name="Clock" className="w-3.5 h-3.5 text-teal-600" />
                  <span>Est. {service.typicalDuration}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100/90 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  <span>Learn More</span>
                  <DentalIcon name="ChevronRight" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onBookService(service.name)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-teal-50 px-2.5 py-1 rounded-md border border-slate-200/80 transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for personalized treatment consult */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-white border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <DentalIcon name="HeartPulse" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Unsure which dental treatment you need?</h4>
              <p className="text-xs text-slate-600">Schedule a complete diagnostic examination with our senior dental team.</p>
            </div>
          </div>
          <button
            onClick={() => onBookService('General Dentistry Consult')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs whitespace-nowrap cursor-pointer transition-colors"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
