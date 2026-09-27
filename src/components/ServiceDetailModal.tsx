import React from 'react';
import { DentalService } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface ServiceDetailModalProps {
  service: DentalService | null;
  onClose: () => void;
  onBookThis: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookThis,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close service details"
        >
          <DentalIcon name="X" className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
            <DentalIcon name={service.icon} className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100/60">
              Est. {service.typicalDuration}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{service.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{service.shortDescription}</p>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Procedure Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {service.fullDescription}
            </p>
          </div>

          {/* Procedure Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Standard Treatment Workflow
            </h4>
            <div className="space-y-2.5">
              {service.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Key Patient Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-50/50 border border-teal-100/60 text-xs text-slate-800">
                  <DentalIcon name="Check" className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 text-xs text-slate-600">
            <strong className="text-slate-800">Recommended For:</strong> {service.recommendedFor}
          </div>
        </div>

        {/* Modal Actions */}
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
              const name = service.name;
              onClose();
              onBookThis(name);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <DentalIcon name="Calendar" className="w-3.5 h-3.5" />
            <span>Book {service.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
