import React, { useState, useEffect, useRef } from 'react';
import { SLIDES_DATA, PRESENTATION_METADATA } from '../../data/presentationData';
import { SlideContent } from './SlideContent';
import { DentalIcon, ToothLogoIcon } from '../DentalIcon';
import { downloadPptxFile } from '../../utils/generatePptx';

interface PresentationDeckProps {
  onExitToWebsite: () => void;
  onSwitchToVideoMode?: () => void;
}

export const PresentationDeck: React.FC<PresentationDeckProps> = ({
  onExitToWebsite,
  onSwitchToVideoMode,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid' | 'print'>('slide');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string>('');
  const deckContainerRef = useRef<HTMLDivElement>(null);

  const totalSlides = SLIDES_DATA.length;
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  const handleDownloadPptx = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress('Generating PowerPoint file...');
      await downloadPptxFile((msg) => setDownloadProgress(msg));
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress('');
      }, 1500);
    } catch (err) {
      console.error('Error generating PPTX:', err);
      setIsDownloading(false);
      setDownloadProgress('Download error. Please try again.');
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setViewMode('slide');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'grid') {
        if (e.key === 'Escape') {
          setViewMode('slide');
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(totalSlides - 1);
      } else if (e.key === 'g' || e.key === 'G') {
        setViewMode((prev) => (prev === 'grid' ? 'slide' : 'grid'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, totalSlides]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      deckContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={deckContainerRef}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none"
    >
      {/* Top Presentation Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        {/* Left: Branding & Deck Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <ToothLogoIcon className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                {PRESENTATION_METADATA.clientName}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                Client PPT Deck
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400">
              {currentSlide.title}
            </p>
          </div>
        </div>

        {/* Center: Slide Controls & Counter */}
        {viewMode === 'slide' && (
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              title="Previous Slide (Left Arrow)"
              aria-label="Previous Slide"
            >
              <DentalIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
            </button>

            <span className="text-xs font-mono font-semibold text-slate-200">
              {currentSlide.slideNumber} <span className="text-slate-500">/</span> {totalSlides}
            </span>

            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              title="Next Slide (Right Arrow or Space)"
              aria-label="Next Slide"
            >
              <DentalIcon name="ChevronRight" className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right: Actions, Download PPTX, & Return to Live Website */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Watch Video Mode Button with Voiceover */}
          {onSwitchToVideoMode && (
            <button
              onClick={onSwitchToVideoMode}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer animate-pulse"
              title="Watch full presentation as video with studio voiceover narration"
            >
              <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-rose-200" />
              <span>Watch Video Walkthrough</span>
            </button>
          )}

          {/* Direct Download PPTX Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isDownloading}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            title="Download real Microsoft PowerPoint (.pptx) file"
          >
            {isDownloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Saving PPTX...</span>
              </>
            ) : (
              <>
                <DentalIcon name="Zap" className="w-3.5 h-3.5 text-emerald-200" />
                <span>Download .PPTX</span>
              </>
            )}
          </button>

          {/* Deck Grid View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'slide' : 'grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-teal-600 text-white border-teal-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Grid Overview (Press G)"
          >
            <DentalIcon name="Layers" className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview Grid</span>
          </button>

          {/* Print to PDF button */}
          <button
            onClick={handlePrintPdf}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs items-center gap-1 transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <span>PDF</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <DentalIcon name="ExternalLink" className="w-3.5 h-3.5" />
          </button>

          {/* Return to Live Site */}
          <button
            onClick={onExitToWebsite}
            className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch to Live Website"
          >
            <DentalIcon name="ArrowRight" className="w-3.5 h-3.5 rotate-180" />
            <span>Live Website</span>
          </button>
        </div>
      </header>

      {/* Download Status Toast / Banner */}
      {downloadProgress && (
        <div className="bg-emerald-950 text-emerald-200 text-xs px-4 py-1.5 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DentalIcon name="CheckCircle2" className="w-4 h-4 text-emerald-400" />
            <span>{downloadProgress}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">Isha_Dental_Care_Website_Presentation.pptx</span>
        </div>
      )}

      {/* Main Slide Presentation Stage */}
      {viewMode === 'slide' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {/* 16:9 Widescreen Slide Container */}
          <div className="w-full max-w-6xl aspect-16/10 sm:aspect-16/9 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative transition-all duration-300">
            <SlideContent
              slide={currentSlide}
              onNavigateToSlide={(idx) => setCurrentSlideIndex(idx - 1)}
            />
          </div>

          {/* Bottom Slide Navigator & Quick Shortcuts */}
          <div className="w-full max-w-6xl mt-4 px-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-teal-400">
                Category: {currentSlide.category}
              </span>
              <span>·</span>
              <span className="hidden sm:inline text-slate-500">
                Use ← / → keys or Spacebar to navigate
              </span>
            </div>

            {/* Micro thumbnail stepper */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {SLIDES_DATA.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-6 bg-teal-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Jump to Slide ${s.slideNumber}: ${s.title}`}
                  aria-label={`Jump to Slide ${s.slideNumber}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Grid Overview of All 20 Slides */
        <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white">Presentation Deck Overview</h2>
              <p className="text-xs text-slate-400 mt-1">
                All 20 client slides at a glance. Click any slide to present in full 16:9 widescreen.
              </p>
            </div>
            <button
              onClick={() => setViewMode('slide')}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold self-start sm:self-auto cursor-pointer"
            >
              Resume Slide Show (Slide {currentSlide.slideNumber})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SLIDES_DATA.map((s, idx) => {
              const isSelected = currentSlideIndex === idx;
              return (
                <div
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-400 ring-2 ring-teal-500/50 shadow-lg shadow-teal-500/10'
                      : 'border-slate-800 hover:border-slate-600 bg-slate-900/60'
                  }`}
                >
                  {/* Miniature 16:9 Thumbnail Header */}
                  <div className="aspect-16/9 bg-slate-950 p-3.5 flex flex-col justify-between border-b border-slate-800 group-hover:bg-slate-900 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                        Slide {s.slideNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {s.category}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 mt-2">
                      {s.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                      <span className="line-clamp-1">{s.subtitle || 'Executive View'}</span>
                      <DentalIcon name="ArrowRight" className="w-3 h-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Click to present</span>
                    {isSelected && (
                      <span className="text-teal-400 font-bold text-[10px]">Active</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
