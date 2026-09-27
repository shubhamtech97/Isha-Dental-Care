import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, DOCTORS_DATA, CLINIC_INFO } from '../data/clinicData';
import { DentalIcon } from './DentalIcon';

interface AppointmentRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'Pending Confirmation' | 'Confirmed';
  createdAt: string;
}

interface AppointmentBookingProps {
  initialService?: string;
  initialDoctor?: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  initialService,
  initialDoctor,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: initialService || '',
    preferredDate: '',
    preferredTime: '10:00 AM - 11:00 AM',
    message: initialDoctor ? `Preferred Doctor: ${initialDoctor}` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedAppointments, setSavedAppointments] = useState<AppointmentRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'recent'>('form');

  // Load existing local bookings
  useEffect(() => {
    try {
      const stored = localStorage.getItem('isha_dental_appointments');
      if (stored) {
        setSavedAppointments(JSON.parse(stored));
      }
    } catch {
      // LocalStorage disabled or unavailable
    }
  }, []);

  // Update form if initialService or initialDoctor changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDoctor) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message
          ? `${prev.message}\nPreferred Doctor: ${initialDoctor}`
          : `Preferred Doctor: ${initialDoctor}`,
      }));
    }
  }, [initialDoctor]);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
  ];

  // Min date should be tomorrow or today
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a dental service';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newAppointment: AppointmentRecord = {
      id: `APT-${Date.now().toString().slice(-6)}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || 'Not provided',
      service: formData.service,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message.trim(),
      status: 'Pending Confirmation',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const updated = [newAppointment, ...savedAppointments];
    setSavedAppointments(updated);
    try {
      localStorage.setItem('isha_dental_appointments', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      preferredDate: '',
      preferredTime: '10:00 AM - 11:00 AM',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="appointment" className="py-20 bg-gradient-to-b from-white via-teal-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 p-8 text-white relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase bg-white/10 px-3 py-1 rounded-md">
                  Easy Online Scheduling
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
                  Book Your Dental Appointment
                </h2>
                <p className="text-sm text-teal-100/90 mt-1 max-w-xl">
                  Choose your preferred service, doctor, and convenient time slot. Our clinic reception promptly verifies each request.
                </p>
              </div>

              {savedAppointments.length > 0 && (
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'form' ? 'bg-white text-teal-900 font-semibold' : 'text-white hover:text-teal-200'
                    }`}
                  >
                    New Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('recent')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'recent' ? 'bg-white text-teal-900 font-semibold' : 'text-white hover:text-teal-200'
                    }`}
                  >
                    My Bookings ({savedAppointments.length})
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer for transparent appointment request status */}
            <div className="mt-4 pt-3 border-t border-teal-600/50 flex items-center gap-2 text-xs text-teal-200">
              <DentalIcon name="Info" className="w-3.5 h-3.5 shrink-0" />
              <span>
                Demonstration booking pipeline. All appointment slots are tentatively requested and confirmed via phone call or WhatsApp by our front desk.
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'recent' && savedAppointments.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Your Appointment Requests</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="text-xs text-teal-700 hover:text-teal-800 font-semibold"
                  >
                    + Book Another Visit
                  </button>
                </div>

                <div className="space-y-3">
                  {savedAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500">{apt.id}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{apt.fullName} — {apt.service}</p>
                        <p className="text-xs text-slate-600">
                          📅 {apt.preferredDate} at {apt.preferredTime}
                        </p>
                      </div>

                      <div className="text-left sm:text-right text-xs text-slate-500">
                        <p>Contact: {apt.phone}</p>
                        <p className="text-[11px] text-slate-400">Submitted {apt.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isSubmitted ? (
              /* Success State */
              <div className="text-center py-10 px-4 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <DentalIcon name="CheckCircle2" className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Thank you!</h3>
                  <p className="text-base text-slate-600 max-w-lg mx-auto font-medium">
                    Your appointment request has been received. Our team will contact you shortly.
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    We will call or message you on <strong className="text-slate-700">{formData.phone}</strong> to confirm your slot for {formData.service} on {formData.preferredDate}.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=Hi%20Isha%20Dental%20Care%2C%20I%20just%20submitted%20an%20appointment%20request%20for%20${encodeURIComponent(formData.fullName)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <DentalIcon name="MessageCircle" className="w-4 h-4" />
                    <span>Confirm Faster via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Actual Booking Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="e.g. Ramesh Deshmukh"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100 bg-white'
                      }`}
                      aria-required="true"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                        <DentalIcon name="ClockAlert" className="w-3.5 h-3.5 shrink-0" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="e.g. +91 98220 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100 bg-white'
                      }`}
                      aria-required="true"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                        <DentalIcon name="ClockAlert" className="w-3.5 h-3.5 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100 bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Select Service */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Service <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 cursor-pointer bg-white ${
                        errors.service
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
                      }`}
                      aria-required="true"
                    >
                      <option value="">-- Choose Dental Treatment --</option>
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} ({srv.typicalDuration})
                        </option>
                      ))}
                      <option value="General Checkup & Consultation">General Checkup & Consultation</option>
                      <option value="Emergency Toothache Care">Emergency Toothache Care</option>
                      <option value="Second Opinion / Smile Makeover">Second Opinion / Smile Makeover</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.service}</p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 cursor-pointer ${
                        errors.preferredDate
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100 bg-white'
                      }`}
                      aria-required="true"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Time <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 cursor-pointer bg-white ${
                        errors.preferredTime
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
                      }`}
                      aria-required="true"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Dental Concern or Specific Message <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Briefly describe your symptoms (e.g. sharp tooth sensitivity with cold water, broken filling, cosmetic consult)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm transition-all focus:outline-none bg-white resize-none"
                  />
                </div>

                {/* Submit button & Privacy info */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 text-center sm:text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <DentalIcon name="Shield" className="w-3.5 h-3.5 text-teal-600" />
                      Strict medical confidentiality guaranteed.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    <DentalIcon name="Calendar" className="w-4 h-4 text-teal-200" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
