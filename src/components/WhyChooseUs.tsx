import React from 'react';
import { WHY_CHOOSE_US } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="Award" className="w-3.5 h-3.5" />
            <span>The Isha Dental Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Isha Dental Care?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We combine clinical precision, advanced dental technology, and empathetic bedside manner to provide stress-free oral care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-teal-200 shadow-2xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <DentalIcon name={item.icon} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>Verified Patient Priority Protocol</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
