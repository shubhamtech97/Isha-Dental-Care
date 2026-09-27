export interface SlideData {
  id: number;
  slideNumber: string;
  category: string;
  title: string;
  subtitle?: string;
  leadQuote?: string;
  keyPoints?: {
    title: string;
    description: string;
    icon?: string;
    badge?: string;
  }[];
  contentNote?: string;
  voiceoverScript: string;
  estimatedDurationSeconds?: number;
}

export const PRESENTATION_METADATA = {
  clientName: "Isha Dental Care",
  projectTitle: "Website Design & Digital Experience Presentation",
  tagline: "Modern Digital Experience for a Modern Dental Practice",
  agencyName: "Apex Healthcare Digital Studio",
  presenter: "Senior Digital Product Design Team",
  date: "September 2026",
  totalSlides: 20,
};

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    slideNumber: "01",
    category: "Cover",
    title: "Isha Dental Care",
    subtitle: "Modern Digital Experience for a Modern Dental Practice",
    leadQuote: "Website Design & Digital Experience Presentation",
    contentNote: "Executive Presentation for Clinic Leadership & Ownership",
    estimatedDurationSeconds: 15,
    voiceoverScript: "Welcome to the client presentation for the new Isha Dental Care website. I am pleased to walk you through how this modern, patient-first digital platform has been engineered to elevate your clinic's brand, alleviate dental fear, and convert curious local visitors into confirmed appointments. Let us begin our tour.",
  },
  {
    id: 2,
    slideNumber: "02",
    category: "Project Overview",
    title: "Project Overview",
    subtitle: "Creating a trustworthy digital front door for Isha Dental Care",
    leadQuote: "Isha Dental Care's new website has been designed to create a professional digital presence that builds patient trust, clearly communicates dental services, and makes appointment booking simple.",
    keyPoints: [
      {
        title: "1. Build Patient Trust",
        description: "Alleviate dental anxiety with transparent clinic photography, verified doctor credentials, and clean sterile standards.",
        icon: "ShieldCheck",
      },
      {
        title: "2. Showcase Dental Services",
        description: "Clear categorization of 8 core treatments with procedure breakdowns, estimated durations, and patient benefits.",
        icon: "Sparkles",
      },
      {
        title: "3. Make Appointment Booking Easy",
        description: "Frictionless online booking with date, time, and service selectors, plus one-tap WhatsApp and phone access.",
        icon: "Calendar",
      },
      {
        title: "4. Create a Strong Online Presence",
        description: "A fast, mobile-first, and SEO-structured healthcare platform ready for local patient discovery.",
        icon: "Award",
      },
    ],
    estimatedDurationSeconds: 22,
    voiceoverScript: "On Slide 2, we review our four guiding project objectives. Our primary focus is fourfold: first, building undeniable patient trust from the very first click; second, clearly showcasing all clinical treatments without confusing medical jargon; third, eliminating booking friction; and fourth, creating an authoritative digital footprint for your clinic across the region.",
  },
  {
    id: 3,
    slideNumber: "03",
    category: "Design Strategy",
    title: "The Design Concept",
    subtitle: "Crafting a reassuring healthcare visual identity",
    leadQuote: "Dental websites must balance clinical authority with emotional warmth. Our design system replaces cold, intimidating clinical tropes with an open, modern, and empathetic patient interface.",
    keyPoints: [
      {
        title: "Clean",
        description: "A clutter-free interface with deliberate whitespace that makes dental information effortless to read and understand.",
        badge: "Clutter-Free",
      },
      {
        title: "Professional",
        description: "A premium healthcare visual identity utilizing clinical navy and fresh teal that communicates high medical credibility.",
        badge: "Authoritative",
      },
      {
        title: "Comfortable",
        description: "Soft teal and cyan accents paired with warm welcoming imagery specifically designed to reduce patient anxiety.",
        badge: "Reassuring",
      },
      {
        title: "Modern",
        description: "Responsive layouts, rounded cards, subtle micro-interactions, and accessible typography tailored for all ages.",
        badge: "Contemporary",
      },
    ],
    estimatedDurationSeconds: 20,
    voiceoverScript: "Turning to Slide 3, we explore the visual design concept. Dental websites must balance clinical authority with emotional warmth. Rather than cold, sterile hospital aesthetics, we crafted an airy design system featuring soft teal gradients, deliberate whitespace, rounded cards, and reassuring photography designed specifically to soothe patient anxiety.",
  },
  {
    id: 4,
    slideNumber: "04",
    category: "Core Experience",
    title: "Homepage Experience",
    subtitle: "Converting first-time visitors into confident patients",
    leadQuote: "Patients decide within 5 seconds whether a healthcare clinic feels safe, clean, and professional. The homepage is engineered to immediately reassure and guide them to act.",
    keyPoints: [
      {
        title: "Clear 'Your Smile. Our Care.' Messaging",
        description: "Direct, warm, and memorable headline immediately establishing empathetic patient commitment.",
      },
      {
        title: "High-Visibility Appointment CTAs",
        description: "Prominent primary action button paired with secondary 'Explore Services' for informational visitors.",
      },
      {
        title: "Patient Trust Assurances",
        description: "Instant checkmarks highlighting experienced dentists, modern equipment, and comfortable care.",
      },
      {
        title: "Authentic Clinical Photography",
        description: "Pristine operatory visuals featuring ISO/NABH grade sterilization highlights.",
      },
    ],
    estimatedDurationSeconds: 21,
    voiceoverScript: "Slide 4 showcases the homepage experience. Research shows patients decide within five seconds whether a clinic feels safe and professional. With the memorable headline 'Your Smile. Our Care.', prominent appointment booking buttons, and verified trust badges, visitors instantly recognize your clinic as a top-tier dental destination.",
  },
  {
    id: 5,
    slideNumber: "05",
    category: "Services",
    title: "Dental Services — Clear & Easy to Explore",
    subtitle: "Comprehensive treatment catalog designed around patient needs",
    leadQuote: "The service structure helps visitors quickly understand what treatments are available and guides them toward taking action without medical jargon overwhelm.",
    estimatedDurationSeconds: 23,
    voiceoverScript: "On Slide 5, we present your comprehensive service catalog. We categorized your treatments into eight distinct areas: general dentistry, cosmetic whitening, root canal therapy, dental implants, pediatric dentistry, and clear aligners. Each card provides procedure details, typical durations, and an instant booking action.",
  },
  {
    id: 6,
    slideNumber: "06",
    category: "Value Proposition",
    title: "Why Choose Isha Dental Care",
    subtitle: "Building patient confidence before they step into the clinic",
    leadQuote: "The website communicates the clinic's strengths before the patient even contacts the clinic, establishing why Isha Dental Care is their best choice.",
    keyPoints: [
      {
        title: "Experienced Dental Professionals",
        description: "Over a decade of combined clinical expertise in restorative, cosmetic, and pediatric dental care.",
        icon: "Award",
      },
      {
        title: "Personalized Treatment Plans",
        description: "Tailored treatment options, transparent discussions, and patient comfort roadmaps.",
        icon: "UserCheck",
      },
      {
        title: "Modern Dental Technology",
        description: "Low-radiation digital radiography, intraoral scanners, and motorized rotary endodontics.",
        icon: "Microscope",
      },
      {
        title: "Comfortable Clinic Environment",
        description: "Calming atmosphere, gentle anesthetics, and relaxing operatory design to soothe dental fear.",
        icon: "HeartPulse",
      },
      {
        title: "Transparent Pricing",
        description: "Clear, upfront fee structures with zero hidden charges and flexible payment choices.",
        icon: "CheckCircle2",
      },
      {
        title: "Patient-First Approach",
        description: "Same-day emergency support, attentive post-treatment follow-ups, and flexible scheduling.",
        icon: "HeartHandshake",
      },
    ],
    estimatedDurationSeconds: 22,
    voiceoverScript: "Slide 6 highlights your key differentiators. Before booking, patients ask: 'Why should I trust this clinic?' Here we articulate your seasoned dentists, personalized treatment plans, modern low-radiation technology, transparent pricing, and gentle patient-first care, answering their concerns upfront.",
  },
  {
    id: 7,
    slideNumber: "07",
    category: "Doctors & Clinical Team",
    title: "Introducing the Dental Experts",
    subtitle: "Humanizing care with verified doctor credentials",
    leadQuote: "Patients choose people, not logos. Dedicated doctor profile cards build emotional familiarity, highlight academic qualifications, and ease treatment apprehension.",
    contentNote: "Sample Content — Final doctor names, credentials, photos, and consultation hours can be customized by the clinic.",
    estimatedDurationSeconds: 21,
    voiceoverScript: "Moving to Slide 7, we introduce your dental experts. Patients choose people, not logos. Dedicated doctor profiles for Dr. Priya Sharma, Dr. Rahul Mehta, and Dr. Ananya Patel highlight their university degrees, clinical specialties, and warm personalities, transforming clinical fear into friendly trust.",
  },
  {
    id: 8,
    slideNumber: "08",
    category: "Conversion Funnel",
    title: "Designed to Convert Visitors into Appointments",
    subtitle: "A frictionless 4-step digital booking pathway",
    leadQuote: "The booking experience is designed to reduce friction and make it easy for patients to submit an appointment request 24/7 from any device.",
    estimatedDurationSeconds: 22,
    voiceoverScript: "Slide 8 details our conversion funnel. The interactive appointment booking system guides patients through four straightforward steps: selecting their treatment, picking an available date and time, providing basic contact details, and receiving an immediate confirmation with reference code and SMS reminders.",
  },
  {
    id: 9,
    slideNumber: "09",
    category: "Mobile First",
    title: "Mobile-First Patient Experience",
    subtitle: "70%+ of dental clinic searches happen on mobile devices",
    leadQuote: "Patients can access the clinic website comfortably from smartphones, tablets, and desktops with zero pinch-zooming and instant touch controls.",
    keyPoints: [
      {
        title: "Fully Responsive Architecture",
        description: "Fluid scaling across all screen sizes (1440px desktop down to 360px smartphones).",
      },
      {
        title: "One-Touch Click-to-Call",
        description: "Instant phone calling for urgent inquiries directly from the sticky header or floating bar.",
      },
      {
        title: "Dedicated WhatsApp Chat Action",
        description: "Pre-filled WhatsApp inquiries allowing patients to text the front desk in seconds.",
      },
      {
        title: "Thumb-Friendly Touch Targets",
        description: "All interactive buttons and form fields meet strict 44px touch-target ergonomics.",
      },
    ],
    estimatedDurationSeconds: 20,
    voiceoverScript: "On Slide 9, we focus on mobile optimization. Over seventy percent of dental clinic searches occur on smartphones. We built the platform with thumb-friendly controls, one-touch phone dialing, and a floating WhatsApp button, allowing mobile users to connect with your reception in seconds.",
  },
  {
    id: 10,
    slideNumber: "10",
    category: "Emergency & Triage",
    title: "Quick Access When Patients Need Help",
    subtitle: "Rapid triage for urgent dental pain and dental trauma",
    leadQuote: "Important actions remain easy to access so patients can contact the clinic without searching through the website during an acute dental crisis.",
    estimatedDurationSeconds: 19,
    voiceoverScript: "Slide 10 highlights emergency dental support. When someone is in acute pain from a toothache or broken tooth, they need immediate reassurance. Our high-visibility emergency banner provides direct telephone triage and instant directions to receive prompt, compassionate care.",
  },
  {
    id: 11,
    slideNumber: "11",
    category: "Social Proof",
    title: "Creating Trust Before the First Visit",
    subtitle: "Overcoming fear and skepticism with verified proof",
    leadQuote: "Patients often research a clinic online before making a decision. The website is structured to answer common questions and create familiarity before the first visit.",
    contentNote: "Sample Content — Testimonials and star ratings are demo placeholders ready to be updated with real Google or patient review excerpts.",
    estimatedDurationSeconds: 20,
    voiceoverScript: "Slide 11 addresses social proof. Positive patient testimonials and five-star ratings directly resolve skepticism. These verified stories highlight painless treatments, friendly staff, and outstanding cosmetic results, giving prospective patients the confidence to book.",
  },
  {
    id: 12,
    slideNumber: "12",
    category: "Patient Education",
    title: "Answers Before Patients Ask",
    subtitle: "Proactive FAQ system reducing phone inquiry load",
    leadQuote: "FAQ content reduces uncertainty and helps patients find important information quickly, addressing common pain-points and treatment misconceptions.",
    estimatedDurationSeconds: 19,
    voiceoverScript: "Turning to Slide 12, our interactive FAQ section proactively answers seven of the most common patient questions regarding pain management, appointment lengths, and dental hygiene. This educates patients and frees up your front desk staff from repetitive telephone calls.",
  },
  {
    id: 13,
    slideNumber: "13",
    category: "Location & Access",
    title: "Easy to Find. Easy to Contact.",
    subtitle: "Seamless physical clinic discovery in Solapur & Pune region",
    leadQuote: "Detailed street address, prominent landmarks (D-Mart & Mhetre Tower), clear operating hours, and a simulated interactive map guide visitors directly to the clinic.",
    contentNote: "Final clinic contact and location details to be confirmed and finalized by the client.",
    estimatedDurationSeconds: 21,
    voiceoverScript: "Slide 13 covers clinic location and accessibility. Located at Coral Business Centre near D-Mart, your physical address, consultation hours, and interactive map embed ensure that local residents can easily navigate to your clinic without confusion.",
  },
  {
    id: 14,
    slideNumber: "14",
    category: "Technical Foundation",
    title: "Built for Discoverability",
    subtitle: "Sound technical SEO and performance architecture",
    leadQuote: "The website has been structured with search visibility and usability in mind, ensuring Google and social networks accurately recognize Isha Dental Care.",
    keyPoints: [
      {
        title: "Semantic HTML5 Hierarchy",
        description: "Logical H1/H2/H3 tag nesting allowing search engine crawlers to parse treatment topics easily.",
      },
      {
        title: "Schema.org 'Dentist' JSON-LD",
        description: "Structured local business data embedded in code for Google Local Knowledge Panels and search snippets.",
      },
      {
        title: "OpenGraph & Social Share Cards",
        description: "Rich link previews with clinic imagery and descriptions when shared on WhatsApp, Facebook, or LinkedIn.",
      },
      {
        title: "High Performance & Zero Lag",
        description: "Optimized image loading, responsive layouts, and clean code ensuring rapid loading on mobile networks.",
      },
    ],
    estimatedDurationSeconds: 22,
    voiceoverScript: "Slide 14 details our technical SEO architecture. Under the hood, we implemented Schema.org Dentist structured data, semantic headings, fast mobile loading, and OpenGraph social cards, ensuring Google and local directories properly rank Isha Dental Care in local searches.",
  },
  {
    id: 15,
    slideNumber: "15",
    category: "Patient Journey",
    title: "The Patient Journey",
    subtitle: "Mapping the path from search query to clinic appointment",
    leadQuote: "A structured digital journey that turns curious visitors into booked appointments through steady trust accumulation.",
    estimatedDurationSeconds: 20,
    voiceoverScript: "On Slide 15, we trace the patient journey from start to finish. From their initial Google search, to discovering treatment options, reading doctor credentials, submitting an appointment request, and walking into your clinic feeling comfortable and welcomed.",
  },
  {
    id: 16,
    slideNumber: "16",
    category: "Business Value",
    title: "How the Website Supports the Clinic",
    subtitle: "Measurable commercial and operational advantages",
    leadQuote: "A modern website is more than a digital business card — it is an active clinical asset that improves patient acquisition, front-desk efficiency, and local reputation.",
    keyPoints: [
      {
        title: "1. Strong Online Presence",
        description: "Establishes Isha Dental Care as a premium, forward-thinking medical practice in the local market.",
      },
      {
        title: "2. Better Patient Experience",
        description: "Patients can explore treatments, study doctor credentials, and book visits at their own convenience.",
      },
      {
        title: "3. More Direct Enquiries",
        description: "Prominent click-to-call, WhatsApp messaging, and online appointment forms eliminate conversion friction.",
      },
      {
        title: "4. Service Visibility",
        description: "Educates patients about high-value treatments such as dental implants, clear aligners, and cosmetic veneers.",
      },
      {
        title: "5. Patient Trust",
        description: "Transparent hygiene protocols, genuine doctor profiles, and reviews alleviate fear and build loyalty.",
      },
    ],
    estimatedDurationSeconds: 22,
    voiceoverScript: "Slide 16 details the tangible business value for your practice. A premium website is an active asset: driving patient acquisition twenty-four-seven, highlighting high-value elective treatments like implants and aligners, and saving administrative time for your front desk.",
  },
  {
    id: 17,
    slideNumber: "17",
    category: "Customization",
    title: "Easy to Personalize",
    subtitle: "Built with modular data architecture for effortless updates",
    leadQuote: "All clinic details, staff bios, service offerings, and contact numbers are centralized in clean configuration files, making ongoing maintenance swift and straightforward.",
    contentNote: "The current presentation contains sample/demo content that should be replaced with final clinic-approved information before public launch.",
    estimatedDurationSeconds: 20,
    voiceoverScript: "On Slide 17, we emphasize ease of personalization. All clinic text, team photos, prices, phone numbers, and consultation hours are organized in a clean configuration file. Your team can update any detail effortlessly without touching complex code.",
  },
  {
    id: 18,
    slideNumber: "18",
    category: "Design Showcase",
    title: "Isha Dental Care — Complete Digital Experience",
    subtitle: "A holistic preview of the integrated platform",
    leadQuote: "A modern, trustworthy, and patient-focused digital presence crafted specifically for Isha Dental Care.",
    estimatedDurationSeconds: 20,
    voiceoverScript: "Slide 18 presents a bird's-eye view of your complete digital experience. From the sticky header and hero banner to the treatment grid, doctor profiles, and booking system, every element works in harmony to showcase Isha Dental Care as a modern dental center.",
  },
  {
    id: 19,
    slideNumber: "19",
    category: "Next Steps",
    title: "Next Steps & Launch Checklist",
    subtitle: "Collaborative roadmap toward official website deployment",
    leadQuote: "Review and approve the checklist items below to transition from presentation preview to live production.",
    estimatedDurationSeconds: 21,
    voiceoverScript: "Turning to Slide 19, here is our launch checklist. We simply need to finalize doctor bios, confirm your clinic phone numbers and WhatsApp line, verify opening hours, and connect your custom domain name to deploy the site live to the world.",
  },
  {
    id: 20,
    slideNumber: "20",
    category: "Conclusion",
    title: "Thank You",
    subtitle: "Isha Dental Care — Your Smile. Our Care.",
    leadQuote: "We are excited to partner with you in launching this transformative digital front door for your dental practice.",
    contentNote: "Open for Questions, Feedback & Content Confirmation",
    estimatedDurationSeconds: 18,
    voiceoverScript: "And on Slide 20, we thank you for your vision and partnership. We are proud to deliver a platform that truly embodies 'Your Smile. Our Care.' We look forward to your feedback and celebrating your successful clinic launch. Thank you.",
  },
];
