/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickInfo } from './components/QuickInfo';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Doctors } from './components/Doctors';
import { AppointmentBooking } from './components/AppointmentBooking';
import { EmergencyCare } from './components/EmergencyCare';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AboutDetailModal } from './components/AboutDetailModal';
import { PresentationDeck } from './components/presentation/PresentationDeck';
import { VideoPresentationPlayer } from './components/presentation/VideoPresentationPlayer';
import { DentalService } from './data/clinicData';
import { DentalIcon } from './components/DentalIcon';
import { downloadPptxFile } from './utils/generatePptx';
import { exportPresentationVideo, triggerFileDownload } from './utils/videoExporter';

export default function App() {
  const [viewMode, setViewMode] = useState<'website' | 'presentation' | 'video'>('website');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<DentalService | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedDoctor, setPreselectedDoctor] = useState<string>('');
  const [isAppDownloading, setIsAppDownloading] = useState(false);
  const [appDownloadProgress, setAppDownloadProgress] = useState<string>('');

  const handleQuickDownloadPptx = async () => {
    try {
      setIsAppDownloading(true);
      setAppDownloadProgress('Generating PowerPoint presentation...');
      await downloadPptxFile((msg) => setAppDownloadProgress(msg));
      setTimeout(() => {
        setIsAppDownloading(false);
        setAppDownloadProgress('');
      }, 1500);
    } catch (err) {
      console.error('Download failed:', err);
      setIsAppDownloading(false);
      setAppDownloadProgress('Download error. Please try again.');
    }
  };

  const handleQuickDownloadVideo = async () => {
    try {
      setIsAppDownloading(true);
      setAppDownloadProgress('Rendering video walkthrough...');
      const blob = await exportPresentationVideo({
        resolution: '720p',
        secondsPerSlide: 3.5,
        includeAudio: true,
        onProgress: (pct) => {
          setAppDownloadProgress(`Rendering video: ${pct}%`);
        },
      });
      setAppDownloadProgress('Saving video file...');
      triggerFileDownload(blob, 'Isha_Dental_Care_Presentation_Walkthrough.webm');
      setTimeout(() => {
        setIsAppDownloading(false);
        setAppDownloadProgress('');
      }, 1500);
    } catch (err) {
      console.error('Video download error:', err);
      setIsAppDownloading(false);
      setAppDownloadProgress('Video export failed.');
    }
  };

  // Check URL hash for direct presentation or video linking
  useEffect(() => {
    const checkHash = () => {
      if (
        window.location.hash === '#video' ||
        window.location.hash === '#video-presentation' ||
        window.location.search.includes('view=video')
      ) {
        setViewMode('video');
      } else if (
        window.location.hash === '#presentation' ||
        window.location.search.includes('view=presentation')
      ) {
        setViewMode('presentation');
      } else if (window.location.hash === '#home' || !window.location.hash) {
        setViewMode('website');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const switchToVideo = () => {
    setViewMode('video');
    window.location.hash = 'video';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToPresentation = () => {
    setViewMode('presentation');
    window.location.hash = 'presentation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToWebsite = () => {
    setViewMode('website');
    window.location.hash = 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleBookService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToAppointment();
  };

  const handleBookWithDoctor = (doctorName: string) => {
    setPreselectedDoctor(doctorName);
    scrollToAppointment();
  };

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleQuickInfoClick = (id: string) => {
    if (id === 'emergency') {
      const el = document.getElementById('emergency-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (id === 'dentists') {
      handleNavClick('#doctors');
      return;
    }
    // For technology or comfort, open the about modal
    setIsAboutModalOpen(true);
  };

  if (viewMode === 'video') {
    return (
      <VideoPresentationPlayer
        onExitToWebsite={switchToWebsite}
        onSwitchToSlideDeck={switchToPresentation}
      />
    );
  }

  if (viewMode === 'presentation') {
    return (
      <PresentationDeck
        onExitToWebsite={switchToWebsite}
        onSwitchToVideoMode={switchToVideo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Client Presentation Mode Switcher Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white text-xs py-2 px-4 border-b border-teal-800/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-semibold text-teal-200">Client Presentation Available:</span>
            <span className="text-slate-300">20-Slide Website Design & Experience Deck</span>
            {appDownloadProgress && (
              <span className="text-emerald-400 font-medium">({appDownloadProgress})</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Watch Video Presentation button with Voiceover */}
            <button
              onClick={switchToVideo}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="Watch full presentation video with studio voiceover narration"
            >
              <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-rose-200" />
              <span>Watch Video</span>
            </button>

            {/* Quick Download Video button */}
            <button
              onClick={handleQuickDownloadVideo}
              disabled={isAppDownloading}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
              title="Generate and download HD video presentation file directly"
            >
              {isAppDownloading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <DentalIcon name="ArrowRight" className="w-3.5 h-3.5 fill-white rotate-90" />
                  <span>Download Video</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickDownloadPptx}
              disabled={isAppDownloading}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
              title="Download PowerPoint presentation (.pptx) file directly"
            >
              {isAppDownloading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <DentalIcon name="Zap" className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Download .PPTX</span>
                </>
              )}
            </button>

            <button
              onClick={switchToPresentation}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <DentalIcon name="Layers" className="w-3.5 h-3.5" />
              <span>View Slides (PPT)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <Navbar onBookClick={scrollToAppointment} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={scrollToAppointment}
          onExploreServices={scrollToServices}
        />

        {/* Quick Information Cards */}
        <QuickInfo onSelectCard={handleQuickInfoClick} />

        {/* About Us Section */}
        <AboutUs onLearnMore={() => setIsAboutModalOpen(true)} />

        {/* Dental Services Grid */}
        <Services
          onSelectService={(service) => setSelectedServiceForModal(service)}
          onBookService={handleBookService}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Emergency Dental Care Banner */}
        <div id="emergency-section">
          <EmergencyCare />
        </div>

        {/* Doctors Section */}
        <Doctors onBookWithDoctor={handleBookWithDoctor} />

        {/* Appointment Booking Section */}
        <AppointmentBooking
          initialService={preselectedService}
          initialDoctor={preselectedDoctor}
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & Map Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleNavClick}
        onServiceClick={handleBookService}
      />

      {/* Floating Action Buttons (WhatsApp & Book Appointment) */}
      <FloatingButtons onBookClick={scrollToAppointment} />

      {/* Persistent Floating Presentation & Video Access on bottom left */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <button
          onClick={switchToVideo}
          type="button"
          className="px-3.5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xl border border-rose-400/40 backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          title="Watch Video Presentation with Studio Voiceover"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-rose-200" />
          <span>🎬 Watch Video Presentation</span>
        </button>

        <button
          onClick={switchToPresentation}
          type="button"
          className="px-3.5 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-white text-xs font-semibold shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          title="View 20-Slide Client Presentation Deck"
        >
          <DentalIcon name="Layers" className="w-3.5 h-3.5 text-teal-400" />
          <span>Slide Deck (PPT)</span>
        </button>
      </div>

      {/* Interactive Detail Modals */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookThis={handleBookService}
      />

      <AboutDetailModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onBook={scrollToAppointment}
      />
    </div>
  );
}
