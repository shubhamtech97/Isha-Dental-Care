import React, { useState } from 'react';
import { FAQ_DATA } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100 mb-3">
            <DentalIcon name="MessageCircle" className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base text-slate-600">
            Find clear answers to common questions about dental hygiene, treatment timelines, and appointments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-teal-300 bg-teal-50/20 shadow-xs'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold text-teal-600 bg-teal-100/60 w-6 h-6 rounded-md flex items-center justify-center shrink-0">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-teal-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <DentalIcon name="ChevronDown" className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Have a specific dental question not covered here?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Our friendly front office and dental assistants are happy to help.</p>
          </div>
          <a
            href="#contact"
            className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
          >
            <span>Ask Us Directly</span>
            <DentalIcon name="ArrowRight" className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
