import React from 'react';
import { QUICK_INFO_CARDS } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface QuickInfoProps {
  onSelectCard?: (id: string) => void;
}

export const QuickInfo: React.FC<QuickInfoProps> = ({ onSelectCard }) => {
  return (
    <section className="py-12 bg-white border-y border-slate-200/70 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_INFO_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCard && onSelectCard(card.id)}
              className="group p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-teal-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <DentalIcon name={card.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100/50">
                    {card.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                <span>Learn standards</span>
                <DentalIcon name="ArrowRight" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
