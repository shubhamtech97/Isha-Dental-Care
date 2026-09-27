import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ToothLogoIcon, DentalIcon } from './DentalIcon';

interface FooterProps {
  onNavClick: (href: string) => void;
  onServiceClick: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onServiceClick }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const servicesList = [
    { label: 'General Dentistry', service: 'General Dentistry' },
    { label: 'Dental Implants', service: 'Dental Implants' },
    { label: 'Root Canal Treatment', service: 'Root Canal Treatment' },
    { label: 'Teeth Whitening', service: 'Teeth Whitening' },
    { label: 'Braces & Aligners', service: 'Braces & Aligners' },
    { label: 'Pediatric Dentistry', service: 'Pediatric Dentistry' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Statement */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <ToothLogoIcon className="w-6 h-6 text-teal-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {CLINIC_INFO.legalName}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              &ldquo;{CLINIC_INFO.mission}&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Providing family dental wellness, gentle cosmetic procedures, emergency pain triage, and smile makeovers with patient-first standards.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Isha Dental Care on Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-400 flex items-center justify-center border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Isha Dental Care on Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-400 flex items-center justify-center border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Isha Dental Care on LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-400 flex items-center justify-center border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(item.href);
                    }}
                    className="hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#appointment"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#appointment');
                  }}
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  Book Appointment →
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {servicesList.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onServiceClick(item.service)}
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact & Hours</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <DentalIcon name="MapPin" className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <DentalIcon name="Phone" className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {CLINIC_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <DentalIcon name="Mail" className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition-colors">
                  {CLINIC_INFO.email}
                </a>
              </p>
              <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-300">{CLINIC_INFO.hours.weekdays}</p>
                <p>{CLINIC_INFO.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© 2026 Isha Dental Care Clinic. All rights reserved.</p>
          <p className="text-center md:text-right">
            Content provided for clinic demonstration purposes · Easy appointment booking online.
          </p>
        </div>
      </div>
    </footer>
  );
};
