import React from 'react';
import { TESTIMONIALS_DATA } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="Star" className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
            <span>Patient Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real stories from individuals and families who trusted us with their smile health and comfort.
          </p>

          <p className="mt-2 text-xs text-slate-400 italic">
            * Testimonials shown are sample demo/placeholder reviews.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400" aria-label={`${item.rating} out of 5 stars`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <DentalIcon key={i} name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Patient info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                  <p className="text-xs text-teal-700 font-medium">{item.treatment}</p>
                </div>
                <span className="text-[11px] text-slate-400">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Bar */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1 text-amber-500">
            <DentalIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
            <DentalIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
            <DentalIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
            <DentalIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
            <DentalIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <span className="font-semibold text-slate-800">4.9 / 5.0 Rating</span>
          <span>·</span>
          <span>Based on over 500+ patient reviews & post-treatment follow-ups</span>
        </div>
      </div>
    </section>
  );
};
