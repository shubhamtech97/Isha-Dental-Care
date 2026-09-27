import pptxgen from 'pptxgenjs';
import { SLIDES_DATA, PRESENTATION_METADATA } from '../data/presentationData';
import { CLINIC_INFO, SERVICES_DATA, DOCTORS_DATA, TESTIMONIALS_DATA, FAQ_DATA } from '../data/clinicData';

/**
 * Generates and downloads a real, professional 20-slide PowerPoint (.pptx) presentation
 * for Isha Dental Care that opens natively in Microsoft PowerPoint, Google Slides, and Apple Keynote.
 */
export async function downloadPptxFile(onProgress?: (status: string) => void): Promise<string> {
  const fileName = 'Isha_Dental_Care_Website_Presentation.pptx';
  const fileUrl = `/${fileName}`;

  if (onProgress) onProgress('Preparing presentation download...');

  // Try direct fetch and download of the pre-rendered full presentation with embedded clinic images
  try {
    const res = await fetch(fileUrl, { method: 'HEAD' });
    if (res.ok) {
      if (onProgress) onProgress('Downloading presentation file...');
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (onProgress) onProgress('Download complete!');
      return fileName;
    }
  } catch (e) {
    console.warn('Direct static PPTX fetch not available, compiling live...', e);
  }

  if (onProgress) onProgress('Compiling 20 presentation slides...');

  const pptx = new pptxgen();

  // 16:9 Widescreen Format
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = PRESENTATION_METADATA.agencyName;
  pptx.company = PRESENTATION_METADATA.agencyName;
  pptx.title = 'Isha Dental Care - Website Design Presentation';
  pptx.subject = 'Client Website Design & Digital Experience Presentation';

  // Healthcare Theme Colors (HEX without #)
  const NAVY = '0F172A';
  const SLATE_DARK = '1E293B';
  const TEAL = '0D9488';
  const TEAL_LIGHT = 'CCFBF1';
  const TEAL_BG = 'F0FDFA';
  const WHITE = 'FFFFFF';
  const GRAY_BG = 'F8FAFC';
  const GRAY_BORDER = 'E2E8F0';
  const TEXT_MAIN = '1E293B';
  const TEXT_MUTED = '64748B';
  const AMBER = 'D97706';
  const ROSE = 'E11D48';

  // Helper for consistent header on content slides
  const addSlideHeader = (slide: pptxgen.Slide, category: string, title: string, subtitle?: string) => {
    // Top category badge
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.4,
      w: 8.4,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
      charSpacing: 1.5,
    });

    // Main slide title
    slide.addText(title, {
      x: 0.8,
      y: 0.65,
      w: 8.4,
      h: 0.5,
      fontSize: 22,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    // Subtitle if provided
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.15,
        w: 8.4,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        color: TEXT_MUTED,
      });
    }

    // Bottom presentation footer
    slide.addText('Isha Dental Care · Website Design Presentation | 20-Slide Client Deck', {
      x: 0.8,
      y: 5.25,
      w: 7.0,
      h: 0.25,
      fontSize: 8,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });

    slide.addText('Apex Healthcare Digital Studio', {
      x: 7.8,
      y: 5.25,
      w: 4.4,
      h: 0.25,
      fontSize: 8,
      fontFace: 'Arial',
      align: 'right',
      color: TEXT_MUTED,
    });
  };

  // ==========================================
  // SLIDE 1: COVER
  // ==========================================
  if (onProgress) onProgress('Creating Slide 1: Cover...');
  const s1 = pptx.addSlide();
  s1.background = { color: NAVY };

  // Decorative teal accent bar
  s1.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 0.8,
    w: 0.4,
    h: 0.4,
    fill: { color: TEAL },
    line: { color: TEAL_LIGHT, width: 1 },
  });

  s1.addText('ISHA DENTAL CARE', {
    x: 1.35,
    y: 0.85,
    w: 6.0,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: TEAL_LIGHT,
    charSpacing: 2,
  });

  s1.addText('Isha Dental Care', {
    x: 0.8,
    y: 1.6,
    w: 8.5,
    h: 0.9,
    fontSize: 38,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s1.addText('Modern Digital Experience for a Modern Dental Practice', {
    x: 0.8,
    y: 2.55,
    w: 8.5,
    h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: TEAL_LIGHT,
  });

  s1.addText('Website Design & Digital Experience Presentation', {
    x: 0.8,
    y: 3.15,
    w: 8.5,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s1.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 3.75,
    w: 11.7,
    h: 0.7,
    fill: { color: '1E293B' },
    line: { color: '334155', width: 1 },
  });

  s1.addText(
    'A high-converting, compassionate, and trustworthy healthcare website engineered to welcome new patients, articulate dental specializations, and drive direct online appointments.',
    {
      x: 1.0,
      y: 3.85,
      w: 11.3,
      h: 0.5,
      fontSize: 11,
      fontFace: 'Arial',
      color: 'CBD5E1',
    }
  );

  s1.addText(`Presented by: ${PRESENTATION_METADATA.agencyName} | September 2026`, {
    x: 0.8,
    y: 4.9,
    w: 11.7,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: '94A3B8',
  });

  // ==========================================
  // SLIDE 2: PROJECT OVERVIEW
  // ==========================================
  if (onProgress) onProgress('Creating Slide 2: Project Overview...');
  const s2 = pptx.addSlide();
  s2.background = { color: WHITE };
  addSlideHeader(s2, 'Project Overview', 'Project Overview', 'Creating a trustworthy digital front door for Isha Dental Care');

  // Executive Quote Box
  s2.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.55,
    w: 11.7,
    h: 0.65,
    fill: { color: TEAL_BG },
    line: { color: TEAL_LIGHT, width: 1 },
  });
  s2.addText(
    '"Isha Dental Care\'s new website has been designed to create a professional digital presence that builds patient trust, clearly communicates dental services, and makes appointment booking simple."',
    {
      x: 1.0,
      y: 1.62,
      w: 11.3,
      h: 0.5,
      fontSize: 11,
      fontFace: 'Arial',
      italic: true,
      color: NAVY,
    }
  );

  // 4 Objective Cards
  const objectives = [
    { title: '1. Build Patient Trust', desc: 'Alleviate dental anxiety with transparent clinic photography, verified doctor credentials, and clean sterile standards.' },
    { title: '2. Showcase Dental Services', desc: 'Clear categorization of 8 core treatments with procedure breakdowns, estimated durations, and patient benefits.' },
    { title: '3. Make Appointment Booking Easy', desc: 'Frictionless online booking with date, time, and service selectors, plus one-tap WhatsApp and phone access.' },
    { title: '4. Create a Strong Online Presence', desc: 'A fast, mobile-first, and SEO-structured healthcare platform ready for local patient discovery.' },
  ];

  objectives.forEach((obj, idx) => {
    const cardX = 0.8 + idx * 3.0;
    s2.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 2.35,
      w: 2.75,
      h: 2.65,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s2.addShape(pptx.ShapeType.rect, {
      x: cardX + 0.2,
      y: 2.55,
      w: 0.4,
      h: 0.4,
      fill: { color: TEAL },
    });

    s2.addText(obj.title, {
      x: cardX + 0.2,
      y: 3.1,
      w: 2.35,
      h: 0.55,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s2.addText(obj.desc, {
      x: cardX + 0.2,
      y: 3.75,
      w: 2.35,
      h: 1.1,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 3: THE DESIGN CONCEPT
  // ==========================================
  if (onProgress) onProgress('Creating Slide 3: Design Concept...');
  const s3 = pptx.addSlide();
  s3.background = { color: WHITE };
  addSlideHeader(s3, 'Design Strategy', 'The Design Concept', 'A premium, reassuring healthcare aesthetic designed to reduce patient anxiety');

  const pillars = [
    { title: 'Clean', badge: 'Clutter-Free', desc: 'A clutter-free interface that makes dental information effortless to read and understand without visual overload.' },
    { title: 'Professional', badge: 'Authoritative', desc: 'A premium healthcare visual identity that communicates clinical competence, sterile hygiene, and doctor credibility.' },
    { title: 'Comfortable', badge: 'Reassuring', desc: 'Soft teal and cyan accents paired with warm welcoming imagery specifically designed to reduce patient fear.' },
    { title: 'Modern', badge: 'Contemporary', desc: 'Responsive layouts, rounded cards, smooth interactions, and modern UI patterns suitable for all age groups.' },
  ];

  pillars.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 0.8 + col * 4.0;
    const cardY = 1.6 + row * 1.65;

    s3.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 3.75,
      h: 1.45,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s3.addText(p.title, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 2.2,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s3.addText(p.badge, {
      x: cardX + 2.4,
      y: cardY + 0.15,
      w: 1.15,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
      align: 'right',
    });

    s3.addText(p.desc, {
      x: cardX + 0.2,
      y: cardY + 0.55,
      w: 3.35,
      h: 0.8,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // Right sidebar: Color system & Typography
  s3.addShape(pptx.ShapeType.rect, {
    x: 9.0,
    y: 1.6,
    w: 3.5,
    h: 3.1,
    fill: { color: NAVY },
    line: { color: '334155', width: 1 },
  });

  s3.addText('HEALTHCARE DESIGN TOKENS', {
    x: 9.2,
    y: 1.8,
    w: 3.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: TEAL_LIGHT,
    charSpacing: 1.5,
  });

  s3.addText('Color System (60-30-10 Rule):', {
    x: 9.2,
    y: 2.15,
    w: 3.1,
    h: 0.25,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s3.addText('• 60% Dominant Canvas: Clean Medical White\n• 30% Structural Elements: Slate & Soft Grays\n• 10% High-Intent Accent: Clinical Medical Teal', {
    x: 9.2,
    y: 2.45,
    w: 3.1,
    h: 0.75,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'CBD5E1',
  });

  s3.addText('Typography Pairings:', {
    x: 9.2,
    y: 3.3,
    w: 3.1,
    h: 0.25,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s3.addText('• Headings: Outfit (Modern & Confident)\n• Body & Forms: Plus Jakarta Sans (High Readability)', {
    x: 9.2,
    y: 3.55,
    w: 3.1,
    h: 0.5,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'CBD5E1',
  });

  // ==========================================
  // SLIDE 4: HOMEPAGE EXPERIENCE
  // ==========================================
  if (onProgress) onProgress('Creating Slide 4: Homepage Experience...');
  const s4 = pptx.addSlide();
  s4.background = { color: WHITE };
  addSlideHeader(s4, 'Core Experience', 'Homepage Experience', 'Converting first-time visitors into confident patients within seconds');

  // Left Showcase Card
  s4.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.6,
    w: 6.2,
    h: 3.2,
    fill: { color: NAVY },
    line: { color: '334155', width: 1 },
  });

  s4.addText('WEBSITE HERO SECTION', {
    x: 1.1,
    y: 1.85,
    w: 5.6,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: TEAL_LIGHT,
  });

  s4.addText('Your Smile. Our Care.', {
    x: 1.1,
    y: 2.15,
    w: 5.6,
    h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s4.addText('"Experience advanced, compassionate dental care designed to keep your smile healthy, confident, and beautiful."', {
    x: 1.1,
    y: 2.7,
    w: 5.6,
    h: 0.55,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'CBD5E1',
  });

  s4.addShape(pptx.ShapeType.rect, {
    x: 1.1,
    y: 3.4,
    w: 2.2,
    h: 0.45,
    fill: { color: TEAL },
  });
  s4.addText('Book an Appointment', {
    x: 1.1,
    y: 3.45,
    w: 2.2,
    h: 0.35,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
    align: 'center',
  });

  s4.addShape(pptx.ShapeType.rect, {
    x: 3.5,
    y: 3.4,
    w: 2.0,
    h: 0.45,
    fill: { color: '334155' },
  });
  s4.addText('Explore Our Services', {
    x: 3.5,
    y: 3.45,
    w: 2.0,
    h: 0.35,
    fontSize: 10,
    fontFace: 'Arial',
    color: WHITE,
    align: 'center',
  });

  s4.addText('✓ Experienced Dentists   ✓ Modern Equipment   ✓ Patient-Focused Care', {
    x: 1.1,
    y: 4.15,
    w: 5.6,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: TEAL_LIGHT,
  });

  // Right Features List
  const heroFeatures = [
    { title: 'Clear Value Proposition', desc: '"Your Smile. Our Care." immediately communicates empathy, clinical dedication, and quality.' },
    { title: 'High-Visibility Primary CTAs', desc: 'Prominent appointment booking button paired with secondary service exploration.' },
    { title: 'Immediate Trust Indicators', desc: 'Checkmarks confirm experienced specialists, sterilization, and easy booking.' },
    { title: 'Goal: Strong 5-Second Impression', desc: 'Ensures patients who land from Google or social media feel confident staying on the site.' },
  ];

  heroFeatures.forEach((feat, idx) => {
    s4.addShape(pptx.ShapeType.rect, {
      x: 7.3,
      y: 1.6 + idx * 0.8,
      w: 5.2,
      h: 0.72,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s4.addText(feat.title, {
      x: 7.5,
      y: 1.68 + idx * 0.8,
      w: 4.8,
      h: 0.25,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s4.addText(feat.desc, {
      x: 7.5,
      y: 1.95 + idx * 0.8,
      w: 4.8,
      h: 0.35,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 5: SERVICES SECTION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 5: Services...');
  const s5 = pptx.addSlide();
  s5.background = { color: WHITE };
  addSlideHeader(s5, 'Services', 'Dental Services — Clear & Easy to Explore', 'Comprehensive catalog structured to guide patients toward booking');

  // 8 Services Grid
  SERVICES_DATA.forEach((srv, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const cardX = 0.8 + col * 3.0;
    const cardY = 1.6 + row * 1.6;

    s5.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 2.75,
      h: 1.45,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s5.addText(srv.name, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 2.35,
      h: 0.35,
      fontSize: 11.5,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s5.addText(srv.shortDescription, {
      x: cardX + 0.2,
      y: cardY + 0.5,
      w: 2.35,
      h: 0.5,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });

    s5.addText(`Est. ${srv.typicalDuration}  ·  Learn More →`, {
      x: cardX + 0.2,
      y: cardY + 1.05,
      w: 2.35,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
    });
  });

  // Callout bar at bottom
  s5.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.85,
    w: 11.7,
    h: 0.35,
    fill: { color: TEAL_BG },
    line: { color: TEAL_LIGHT, width: 1 },
  });
  s5.addText('💡 Interactive Feature: Every service card opens a detailed modal with procedure steps, recovery expectations, and direct booking.', {
    x: 1.0,
    y: 4.9,
    w: 11.3,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: TEAL,
    bold: true,
  });

  // ==========================================
  // SLIDE 6: WHY CHOOSE US
  // ==========================================
  if (onProgress) onProgress('Creating Slide 6: Why Choose Us...');
  const s6 = pptx.addSlide();
  s6.background = { color: WHITE };
  addSlideHeader(s6, 'Value Proposition', 'Why Choose Isha Dental Care', 'Communicating clinical strengths before the patient even contacts the clinic');

  const whyPoints = [
    { title: 'Experienced Dental Professionals', desc: 'Qualified specialists with 10+ years combined experience in restorative, cosmetic, and pediatric care.' },
    { title: 'Personalized Treatment Plans', desc: 'No one-size-fits-all treatments. Transparent discussion of clinical options and patient budgets.' },
    { title: 'Modern Dental Technology', desc: 'Low-radiation digital radiography, intraoral high-def cameras, and rotary endodontics for gentle care.' },
    { title: 'Comfortable Clinic Environment', desc: 'Calming ambiance, sterile operatories, ambient music, and empathetic staff who ease dental fear.' },
    { title: 'Transparent Pricing', desc: 'Clear, upfront fee structures with zero hidden charges. Estimates provided before treatment begins.' },
    { title: 'Patient-First Approach', desc: 'From flexible appointment schedules to prompt post-operative follow-up calls, patient comfort comes first.' },
  ];

  whyPoints.forEach((pt, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cardX = 0.8 + col * 4.0;
    const cardY = 1.6 + row * 1.6;

    s6.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 3.75,
      h: 1.45,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s6.addText(pt.title, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 3.35,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s6.addText(pt.desc, {
      x: cardX + 0.2,
      y: cardY + 0.55,
      w: 3.35,
      h: 0.75,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 7: DOCTORS SECTION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 7: Doctors...');
  const s7 = pptx.addSlide();
  s7.background = { color: WHITE };
  addSlideHeader(s7, 'Doctors & Clinical Team', 'Introducing the Dental Experts', 'Humanizing clinical care with doctor qualifications and specializations');

  DOCTORS_DATA.forEach((doc, idx) => {
    const cardX = 0.8 + idx * 4.0;
    s7.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.6,
      w: 3.75,
      h: 2.8,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s7.addShape(pptx.ShapeType.rect, {
      x: cardX + 0.2,
      y: 1.8,
      w: 3.35,
      h: 0.35,
      fill: { color: TEAL_BG },
      line: { color: TEAL_LIGHT, width: 1 },
    });
    s7.addText(doc.experience, {
      x: cardX + 0.3,
      y: 1.85,
      w: 3.15,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
    });

    s7.addText(doc.name, {
      x: cardX + 0.2,
      y: 2.25,
      w: 3.35,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s7.addText(doc.role, {
      x: cardX + 0.2,
      y: 2.6,
      w: 3.35,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
    });

    s7.addText(doc.qualification, {
      x: cardX + 0.2,
      y: 2.85,
      w: 3.35,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });

    s7.addText(`Specialization: ${doc.specialization}`, {
      x: cardX + 0.2,
      y: 3.15,
      w: 3.35,
      h: 0.45,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_MAIN,
    });

    s7.addText(doc.bio, {
      x: cardX + 0.2,
      y: 3.65,
      w: 3.35,
      h: 0.65,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // Demo disclaimer banner
  s7.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.55,
    w: 11.7,
    h: 0.5,
    fill: { color: 'FEF3C7' },
    line: { color: 'FDE68A', width: 1 },
  });
  s7.addText('⚠️ Sample Content — Final doctor names, credentials, photographs, and consultation schedules can be updated by the clinic.', {
    x: 1.0,
    y: 4.65,
    w: 11.3,
    h: 0.3,
    fontSize: 9.5,
    fontFace: 'Arial',
    bold: true,
    color: AMBER,
  });

  // ==========================================
  // SLIDE 8: APPOINTMENT BOOKING FUNNEL
  // ==========================================
  if (onProgress) onProgress('Creating Slide 8: Appointment Booking...');
  const s8 = pptx.addSlide();
  s8.background = { color: WHITE };
  addSlideHeader(s8, 'Conversion Funnel', 'Designed to Convert Visitors into Appointments', 'A streamlined booking experience that eliminates patient friction');

  // 4 Steps Flow
  const steps = [
    { num: 'Step 1', title: 'Visit Website', desc: 'Discovers clinic via Google or recommendation' },
    { num: 'Step 2', title: 'Explore Services', desc: 'Learns about painless procedures & doctor profiles' },
    { num: 'Step 3', title: 'Build Trust', desc: 'Checks reviews, sterilization & transparent fees' },
    { num: 'Step 4', title: 'Book Appointment', desc: 'Selects date, time & submits request in <60s' },
  ];

  steps.forEach((st, idx) => {
    const cardX = 0.8 + idx * 3.0;
    s8.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.6,
      w: 2.75,
      h: 1.2,
      fill: { color: TEAL_BG },
      line: { color: TEAL_LIGHT, width: 1 },
    });

    s8.addText(st.num, {
      x: cardX + 0.15,
      y: 1.7,
      w: 2.45,
      h: 0.2,
      fontSize: 8.5,
      fontFace: 'Arial',
      bold: true,
      color: TEAL,
    });

    s8.addText(st.title, {
      x: cardX + 0.15,
      y: 1.95,
      w: 2.45,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s8.addText(st.desc, {
      x: cardX + 0.15,
      y: 2.25,
      w: 2.45,
      h: 0.45,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // Form Fields Structure Box
  s8.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 3.0,
    w: 11.7,
    h: 1.9,
    fill: { color: GRAY_BG },
    line: { color: GRAY_BORDER, width: 1 },
  });

  s8.addText('FORM FIELDS & VALIDATION ARCHITECTURE', {
    x: 1.0,
    y: 3.15,
    w: 11.3,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: TEAL,
    charSpacing: 1,
  });

  const fields = [
    '• Full Name (Required, validated)',
    '• Phone Number (Required, formatted)',
    '• Email Address (Optional, validated)',
    '• Select Dental Service (Dropdown)',
    '• Preferred Date (Datepicker with min date)',
    '• Preferred Time Slot (09:00 AM - 08:00 PM)',
    '• Message / Dental Concern (Optional)',
    '• Instant Confirmation & localStorage persistence',
  ];

  fields.forEach((f, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    s8.addText(f, {
      x: 1.0 + col * 5.8,
      y: 3.45 + row * 0.32,
      w: 5.6,
      h: 0.28,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MAIN,
    });
  });

  // ==========================================
  // SLIDE 9: MOBILE EXPERIENCE
  // ==========================================
  if (onProgress) onProgress('Creating Slide 9: Mobile Experience...');
  const s9 = pptx.addSlide();
  s9.background = { color: WHITE };
  addSlideHeader(s9, 'Mobile First', 'Mobile-First Patient Experience', '70%+ of dental clinic searches occur on mobile smartphones');

  const mobileCards = [
    { title: 'Responsive Layout', desc: 'Fluid design that automatically adapts to iPhone, Android, iPad, tablet, and desktop screens.' },
    { title: 'One-Tap Click-to-Call', desc: 'Patients with emergency pain can call the clinic reception with a single tap on the phone number.' },
    { title: 'Direct WhatsApp Chat', desc: 'Floating WhatsApp button pre-fills appointment inquiries for effortless mobile communication.' },
    { title: 'Thumb-Friendly Buttons', desc: 'Touch targets meet WCAG standards (>44px) so booking appointments on mobile is effortless.' },
    { title: 'Mobile Navigation Drawer', desc: 'Smooth animated hamburger menu providing fast access to services, doctors, and location.' },
    { title: 'Fast-Loading Performance', desc: 'Optimized image loading ensures quick page opening even on cellular 4G/5G connections.' },
  ];

  mobileCards.forEach((mc, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cardX = 0.8 + col * 4.0;
    const cardY = 1.6 + row * 1.6;

    s9.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 3.75,
      h: 1.45,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s9.addText(mc.title, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 3.35,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s9.addText(mc.desc, {
      x: cardX + 0.2,
      y: cardY + 0.55,
      w: 3.35,
      h: 0.75,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 10: EMERGENCY & QUICK CONTACT
  // ==========================================
  if (onProgress) onProgress('Creating Slide 10: Emergency Care...');
  const s10 = pptx.addSlide();
  s10.background = { color: WHITE };
  addSlideHeader(s10, 'Emergency & Quick Contact', 'Quick Access When Patients Need Help', 'Rapid triage for acute toothaches, chipped teeth, and sudden dental trauma');

  // Emergency Banner Simulation
  s10.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 1.8,
    fill: { color: NAVY },
    line: { color: '334155', width: 1 },
  });

  s10.addText('EMERGENCY DENTAL ASSISTANCE', {
    x: 1.1,
    y: 1.8,
    w: 11.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: ROSE,
    charSpacing: 1.5,
  });

  s10.addText('Need Urgent Dental Care?', {
    x: 1.1,
    y: 2.1,
    w: 7.0,
    h: 0.45,
    fontSize: 22,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
  });

  s10.addText('"Don\'t let dental pain wait. Contact our clinic for urgent dental assistance."', {
    x: 1.1,
    y: 2.6,
    w: 7.0,
    h: 0.4,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'CBD5E1',
  });

  s10.addShape(pptx.ShapeType.rect, {
    x: 8.8,
    y: 2.2,
    w: 3.3,
    h: 0.6,
    fill: { color: TEAL },
  });
  s10.addText(`📞 Call Now: ${CLINIC_INFO.phone}`, {
    x: 8.8,
    y: 2.3,
    w: 3.3,
    h: 0.4,
    fontSize: 11,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
    align: 'center',
  });

  // 3 Quick Access Triggers
  const triggers = [
    { title: '📞 Click-to-Call', desc: 'Clickable directly on mobile for immediate clinic receptionist triage.' },
    { title: '💬 WhatsApp Chat', desc: 'Floating emerald WhatsApp icon active across every page of the website.' },
    { title: '📅 Floating Booking Button', desc: 'Appears smoothly upon scrolling down to ensure appointment access is never lost.' },
  ];

  triggers.forEach((tr, idx) => {
    const cardX = 0.8 + idx * 4.0;
    s10.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 3.6,
      w: 3.75,
      h: 1.3,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s10.addText(tr.title, {
      x: cardX + 0.2,
      y: 3.75,
      w: 3.35,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s10.addText(tr.desc, {
      x: cardX + 0.2,
      y: 4.1,
      w: 3.35,
      h: 0.65,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 11: PATIENT TRUST
  // ==========================================
  if (onProgress) onProgress('Creating Slide 11: Patient Trust...');
  const s11 = pptx.addSlide();
  s11.background = { color: WHITE };
  addSlideHeader(s11, 'Social Proof', 'Creating Trust Before the First Visit', 'Answering common doubts and building emotional safety before arrival');

  TESTIMONIALS_DATA.forEach((tm, idx) => {
    const cardX = 0.8 + idx * 3.0;
    s11.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.6,
      w: 2.75,
      h: 2.65,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s11.addText('★★★★★', {
      x: cardX + 0.2,
      y: 1.8,
      w: 2.35,
      h: 0.3,
      fontSize: 14,
      fontFace: 'Arial',
      color: AMBER,
    });

    s11.addText(`"${tm.quote}"`, {
      x: cardX + 0.2,
      y: 2.15,
      w: 2.35,
      h: 1.1,
      fontSize: 9.5,
      fontFace: 'Arial',
      italic: true,
      color: TEXT_MAIN,
    });

    s11.addText(`— ${tm.author}`, {
      x: cardX + 0.2,
      y: 3.4,
      w: 2.35,
      h: 0.3,
      fontSize: 10.5,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s11.addText(tm.treatment, {
      x: cardX + 0.2,
      y: 3.75,
      w: 2.35,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEAL,
    });
  });

  s11.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.45,
    w: 11.7,
    h: 0.5,
    fill: { color: 'FEF3C7' },
    line: { color: 'FDE68A', width: 1 },
  });
  s11.addText('⚠️ Note: Testimonials and reviews shown are sample demonstration content ready to be updated with genuine patient feedback upon launch.', {
    x: 1.0,
    y: 4.55,
    w: 11.3,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: AMBER,
  });

  // ==========================================
  // SLIDE 12: FAQ SECTION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 12: FAQ...');
  const s12 = pptx.addSlide();
  s12.background = { color: WHITE };
  addSlideHeader(s12, 'Patient Education', 'Answers Before Patients Ask', 'Addressing treatment doubts and cutting down repetitive phone calls');

  FAQ_DATA.slice(0, 6).forEach((faq, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 0.8 + col * 6.0;
    const cardY = 1.6 + row * 1.05;

    s12.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 5.7,
      h: 0.95,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s12.addText(`Q${idx + 1}: ${faq.question}`, {
      x: cardX + 0.2,
      y: cardY + 0.1,
      w: 5.3,
      h: 0.25,
      fontSize: 10.5,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s12.addText(faq.answer, {
      x: cardX + 0.2,
      y: cardY + 0.35,
      w: 5.3,
      h: 0.52,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 13: CONTACT & LOCATION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 13: Contact & Location...');
  const s13 = pptx.addSlide();
  s13.background = { color: WHITE };
  addSlideHeader(s13, 'Location & Access', 'Easy to Find. Easy to Contact.', 'Guiding local patients to Coral Business Centre with clear landmarks');

  // Contact Info Cards
  const contactDetails = [
    { title: '📍 Clinic Address', val: CLINIC_INFO.address },
    { title: '📞 Clinic Telephone', val: `${CLINIC_INFO.phone} (Reception & Inquiries)` },
    { title: '✉ Email Address', val: CLINIC_INFO.email },
    { title: '🕐 Operating Hours', val: `${CLINIC_INFO.hours.weekdays}\n${CLINIC_INFO.hours.sunday}` },
  ];

  contactDetails.forEach((cd, idx) => {
    const cardX = 0.8 + (idx % 2) * 6.0;
    const cardY = 1.6 + Math.floor(idx / 2) * 1.35;

    s13.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 5.7,
      h: 1.2,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s13.addText(cd.title, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 5.3,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s13.addText(cd.val, {
      x: cardX + 0.2,
      y: cardY + 0.5,
      w: 5.3,
      h: 0.6,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MAIN,
    });
  });

  s13.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.45,
    w: 11.7,
    h: 0.5,
    fill: { color: 'FEF3C7' },
    line: { color: 'FDE68A', width: 1 },
  });
  s13.addText('⚠️ Note: Final clinic contact numbers, email addresses, and landmark directions to be confirmed by the client prior to launch.', {
    x: 1.0,
    y: 4.55,
    w: 11.3,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: AMBER,
  });

  // ==========================================
  // SLIDE 14: SEO & DIGITAL FOUNDATION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 14: SEO...');
  const s14 = pptx.addSlide();
  s14.background = { color: WHITE };
  addSlideHeader(s14, 'Technical Foundation', 'Built for Discoverability', 'Structured with search visibility, accessibility, and speed in mind');

  const seoPoints = [
    { title: 'Semantic HTML5 Hierarchy', desc: 'Logical H1, H2, and H3 headings so search engine bots can easily understand treatments and services.' },
    { title: 'Schema.org "Dentist" JSON-LD', desc: 'Embedded structured metadata for rich Google search snippets, reviews, and Google Maps Knowledge Panels.' },
    { title: 'OpenGraph & Social Share Cards', desc: 'Attractive link preview cards with clinic photography when shared on WhatsApp, Facebook, or LinkedIn.' },
    { title: 'Fast-Loading Performance', desc: 'Zero lag or heavy frameworks, ensuring patients on 4G/5G mobile phones experience instantaneous loading.' },
  ];

  seoPoints.forEach((sp, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 0.8 + col * 6.0;
    const cardY = 1.6 + row * 1.5;

    s14.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 5.7,
      h: 1.35,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s14.addText(sp.title, {
      x: cardX + 0.2,
      y: cardY + 0.15,
      w: 5.3,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s14.addText(sp.desc, {
      x: cardX + 0.2,
      y: cardY + 0.5,
      w: 5.3,
      h: 0.7,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 15: WEBSITE USER JOURNEY
  // ==========================================
  if (onProgress) onProgress('Creating Slide 15: Patient Journey...');
  const s15 = pptx.addSlide();
  s15.background = { color: WHITE };
  addSlideHeader(s15, 'Patient Journey', 'The Patient Journey Flowchart', 'From initial search query to clinic appointment confirmation');

  const journeySteps = [
    { step: '1', title: 'Google / Social', desc: 'Searches for Solapur / Pune dental clinic' },
    { step: '2', title: 'Website Visit', desc: '5-second strong, clean first impression' },
    { step: '3', title: 'Explore Services', desc: 'Reviews procedures, time, and benefits' },
    { step: '4', title: 'Build Trust', desc: 'Examines doctor bios & patient reviews' },
    { step: '5', title: 'Book Online', desc: 'Submits date & service in <60 seconds' },
    { step: '6', title: 'Clinic Triage', desc: 'Front desk confirms slot via phone/WhatsApp' },
    { step: '7', title: 'Clinic Visit', desc: 'Patient arrives confident & well-informed' },
  ];

  journeySteps.forEach((js, idx) => {
    const cardX = 0.6 + idx * 1.74;
    s15.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 2.0,
      w: 1.6,
      h: 2.3,
      fill: { color: idx === 4 ? TEAL_BG : GRAY_BG },
      line: { color: idx === 4 ? TEAL : GRAY_BORDER, width: 1 },
    });

    s15.addText(js.step, {
      x: cardX + 0.1,
      y: 2.15,
      w: 1.4,
      h: 0.3,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: idx === 4 ? TEAL : NAVY,
      align: 'center',
    });

    s15.addText(js.title, {
      x: cardX + 0.1,
      y: 2.5,
      w: 1.4,
      h: 0.45,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
      align: 'center',
    });

    s15.addText(js.desc, {
      x: cardX + 0.1,
      y: 3.0,
      w: 1.4,
      h: 1.1,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      align: 'center',
    });
  });

  // ==========================================
  // SLIDE 16: BUSINESS VALUE
  // ==========================================
  if (onProgress) onProgress('Creating Slide 16: Business Value...');
  const s16 = pptx.addSlide();
  s16.background = { color: WHITE };
  addSlideHeader(s16, 'Business Value', 'How the Website Supports the Clinic', 'Direct operational, reputation, and patient acquisition benefits');

  const bizBenefits = [
    { title: '1. Strong Online Presence', desc: 'Establishes Isha Dental Care as a premium, modern medical practice in the local region.' },
    { title: '2. Better Patient Experience', desc: 'Patients can explore treatments, study doctor credentials, and book visits at their own pace 24/7.' },
    { title: '3. More Direct Enquiries', desc: 'Prominent click-to-call, WhatsApp chat, and online appointment forms eliminate conversion friction.' },
    { title: '4. Service Visibility', desc: 'Educates patients about high-value treatments such as dental implants, clear aligners, and smile makeovers.' },
    { title: '5. Patient Trust & Loyalty', desc: 'Transparent hygiene protocols, genuine doctor profiles, and reviews alleviate fear and build lasting loyalty.' },
  ];

  bizBenefits.forEach((bb, idx) => {
    s16.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.6 + idx * 0.65,
      w: 11.7,
      h: 0.58,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s16.addText(bb.title, {
      x: 1.0,
      y: 1.66 + idx * 0.65,
      w: 3.5,
      h: 0.45,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s16.addText(bb.desc, {
      x: 4.6,
      y: 1.66 + idx * 0.65,
      w: 7.7,
      h: 0.45,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 17: CONTENT CUSTOMIZATION
  // ==========================================
  if (onProgress) onProgress('Creating Slide 17: Customization...');
  const s17 = pptx.addSlide();
  s17.background = { color: WHITE };
  addSlideHeader(s17, 'Client Customization', 'Easy to Personalize', 'All clinic information is centrally organized for rapid updates');

  const customItems = [
    '• Doctor names, bios, qualifications, and schedules',
    '• Real clinic photography & operatory pictures',
    '• Treatment service descriptions & fee structures',
    '• Clinic phone numbers, WhatsApp, & email address',
    '• Clinic street address & Google Maps pin location',
    '• Operating hours & holiday schedule details',
    '• Genuine patient testimonials & star ratings',
    '• Clinic experience statistics (years, patient counts)',
    '• Social media profile links (Instagram, Facebook, LinkedIn)',
    '• Official clinic logo and branding assets',
  ];

  customItems.forEach((ci, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    s17.addText(ci, {
      x: 0.8 + col * 5.8,
      y: 1.6 + row * 0.5,
      w: 5.6,
      h: 0.45,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: TEXT_MAIN,
    });
  });

  s17.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.35,
    w: 11.7,
    h: 0.6,
    fill: { color: 'FEF3C7' },
    line: { color: 'FDE68A', width: 1 },
  });
  s17.addText('⚠️ Important Reminder: The current presentation and website contain sample/demo content that should be replaced with final clinic-approved information before official public launch.', {
    x: 1.0,
    y: 4.45,
    w: 11.3,
    h: 0.4,
    fontSize: 9.5,
    fontFace: 'Arial',
    bold: true,
    color: AMBER,
  });

  // ==========================================
  // SLIDE 18: FINAL WEBSITE PREVIEW
  // ==========================================
  if (onProgress) onProgress('Creating Slide 18: Final Preview...');
  const s18 = pptx.addSlide();
  s18.background = { color: WHITE };
  addSlideHeader(s18, 'Design Showcase', 'Isha Dental Care — Complete Digital Experience', 'A modern, trustworthy, and patient-focused digital presence');

  const sectionsList = [
    { title: 'Sticky Navigation Bar', desc: 'Backdrop blur, tooth logo, quick phone action, and Book Appointment button.' },
    { title: 'Hero Value Proposition', desc: '"Your Smile. Our Care.", ISO sterilization indicators, and 5-sec trust hooks.' },
    { title: '8 Core Dental Services', desc: 'Filtered catalog with interactive "Learn More" procedure modals and durations.' },
    { title: 'Why Choose Us (6 Pillars)', desc: 'Preempts patient anxiety regarding pain, equipment, pricing, and bedside care.' },
    { title: 'Doctors & Specialists', desc: 'Senior dentist, cosmetic surgeon, and pediatric specialist credential cards.' },
    { title: 'Appointment Booking Engine', desc: 'Date, time, and service selectors with instant patient confirmation feedback.' },
  ];

  sectionsList.forEach((sec, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 0.8 + col * 6.0;
    const cardY = 1.6 + row * 1.0;

    s18.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 5.7,
      h: 0.85,
      fill: { color: GRAY_BG },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s18.addText(sec.title, {
      x: cardX + 0.2,
      y: cardY + 0.1,
      w: 5.3,
      h: 0.25,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: NAVY,
    });

    s18.addText(sec.desc, {
      x: cardX + 0.2,
      y: cardY + 0.35,
      w: 5.3,
      h: 0.45,
      fontSize: 9,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  });

  // ==========================================
  // SLIDE 19: NEXT STEPS & LAUNCH CHECKLIST
  // ==========================================
  if (onProgress) onProgress('Creating Slide 19: Next Steps...');
  const s19 = pptx.addSlide();
  s19.background = { color: WHITE };
  addSlideHeader(s19, 'Next Steps', 'Next Steps & Launch Checklist', 'Client approval items required to move from preview to live launch');

  const checklist = [
    '☐ Confirm final clinic address, phone numbers, and WhatsApp line',
    '☐ Confirm doctor profiles, qualifications, and consultation hours',
    '☐ Provide final clinic operatory and consultation room photographs',
    '☐ Confirm treatment service catalog & fee transparency details',
    '☐ Provide genuine patient reviews / Google reviews to publish',
    '☐ Final domain name selection & DNS connection (e.g. ishadentalcare.com)',
    '☐ Cross-browser and mobile device final quality assurance testing',
    '☐ Official website public launch & Google My Business linking',
  ];

  checklist.forEach((item, idx) => {
    s19.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.6 + idx * 0.42,
      w: 11.7,
      h: 0.38,
      fill: { color: idx % 2 === 0 ? GRAY_BG : WHITE },
      line: { color: GRAY_BORDER, width: 1 },
    });

    s19.addText(item, {
      x: 1.0,
      y: 1.64 + idx * 0.42,
      w: 11.3,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MAIN,
    });
  });

  // ==========================================
  // SLIDE 20: THANK YOU
  // ==========================================
  if (onProgress) onProgress('Creating Slide 20: Thank You...');
  const s20 = pptx.addSlide();
  s20.background = { color: NAVY };

  s20.addText('THANK YOU', {
    x: 0.8,
    y: 1.5,
    w: 11.7,
    h: 0.8,
    fontSize: 40,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
    align: 'center',
  });

  s20.addText('Isha Dental Care', {
    x: 0.8,
    y: 2.3,
    w: 11.7,
    h: 0.5,
    fontSize: 22,
    fontFace: 'Arial',
    bold: true,
    color: TEAL_LIGHT,
    align: 'center',
  });

  s20.addText('"Your Smile. Our Care."', {
    x: 0.8,
    y: 2.8,
    w: 11.7,
    h: 0.4,
    fontSize: 16,
    fontFace: 'Arial',
    italic: true,
    color: '94A3B8',
    align: 'center',
  });

  s20.addShape(pptx.ShapeType.rect, {
    x: 3.5,
    y: 3.4,
    w: 6.3,
    h: 1.1,
    fill: { color: '1E293B' },
    line: { color: '334155', width: 1 },
  });

  s20.addText('Questions, Feedback & Content Confirmation', {
    x: 3.6,
    y: 3.55,
    w: 6.1,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: WHITE,
    align: 'center',
  });

  s20.addText(`Presented by: ${PRESENTATION_METADATA.agencyName}\nWebsite: ishadentalcare.com  |  Email: contact@apexhealthcare.design`, {
    x: 3.6,
    y: 3.9,
    w: 6.1,
    h: 0.5,
    fontSize: 10,
    fontFace: 'Arial',
    color: '94A3B8',
    align: 'center',
  });

  // Save the PPTX file
  if (onProgress) onProgress('Compiling PowerPoint presentation file...');
  await pptx.writeFile({ fileName });

  if (onProgress) onProgress('Download ready!');
  return fileName;
}
