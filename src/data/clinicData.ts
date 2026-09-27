/**
 * Isha Dental Care - Clinic Information & Content Data
 * 
 * NOTE: All names, phone numbers, email addresses, statistics, testimonials, 
 * doctor profiles and clinic information in this file are demo/placeholder content.
 * These values can be easily edited and customized.
 */

export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualification: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
  areasOfExpertise: string[];
  schedule: string;
}

export interface DentalService {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  benefits: string[];
  typicalDuration: string;
  procedureSteps: string[];
  recommendedFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  treatment: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  name: "Isha Dental Care",
  legalName: "Isha Dental Care Clinic",
  tagline: "Your Smile. Our Care.",
  subheading: "Experience advanced, compassionate dental care designed to keep your smile healthy, confident, and beautiful.",
  mission: "Creating healthier smiles with compassionate and modern dental care.",
  phone: "+91 8147440264",
  phoneRaw: "+918147440264",
  whatsappNumber: "918147440264",
  email: "ishadentalcare@gmail.com",
  address: "Shop No. 110-11, Coral Business Centre, Near D-Mart, Beside Mhetre Tower, Jule, Solapur-413004, Maharashtra",
  city: "Solapur / Pune Region",
  hours: {
    weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
    sunday: "Sunday: 10:00 AM – 2:00 PM",
  },
  emergencyNote: "24/7 on-call guidance for severe pain, tooth fractures, or acute trauma.",
  googleMapsUrl: "https://maps.google.com/?q=Coral+Business+Centre+Near+D-Mart+Jule+Solapur+413004",
  disclaimer: "All details and statistics shown are editable placeholder data for demonstration purposes."
};

export const CLINIC_STATS = [
  { value: "10+", label: "Years of Experience", description: "Serving families with high-standard dental wellness" },
  { value: "5,000+", label: "Happy Patients", description: "Successful treatments with gentle, personalized care" },
  { value: "15+", label: "Dental Treatments", description: "From preventive care to complex full-mouth rehab" },
  { value: "4.9/5", label: "Patient Rating", description: "Based on verified post-treatment reviews" },
];

export const TRUST_POINTS = [
  "Experienced Dentists",
  "Modern Equipment",
  "Patient-Focused Care",
  "Easy Appointment Booking"
];

export const QUICK_INFO_CARDS = [
  {
    id: "dentists",
    title: "Experienced Dentists",
    description: "Qualified professionals focused on personalized dental care tailored to your exact smile goals.",
    icon: "GraduationCap",
    highlight: "Certified Specialists"
  },
  {
    id: "tech",
    title: "Modern Technology",
    description: "Advanced equipment for accurate diagnosis, minimal discomfort, and swift treatment turnaround.",
    icon: "Cpu",
    highlight: "Digital 3D Scanners"
  },
  {
    id: "comfort",
    title: "Comfortable Environment",
    description: "A friendly, relaxing clinic experience designed to ease dental anxiety for patients of all ages.",
    icon: "HeartPulse",
    highlight: "Stress-Free Care"
  },
  {
    id: "emergency",
    title: "Emergency Care",
    description: "Quick support for urgent dental problems, severe toothaches, accidents, and sudden restorations.",
    icon: "ClockAlert",
    highlight: "Priority Triage"
  }
];

export const SERVICES_DATA: DentalService[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    shortDescription: "Routine checkups, cleanings and preventive dental care.",
    fullDescription: "Comprehensive oral health examinations, digital dental X-rays, cavity detection, and preventative fluoride therapies designed to maintain strong natural teeth for life.",
    icon: "ShieldCheck",
    benefits: [
      "Early detection of cavities and gum inflammation",
      "Digital low-radiation diagnostics",
      "Custom oral hygiene maintenance guidance",
      "Pain-free preventive scaling and polishing"
    ],
    typicalDuration: "40 – 60 minutes",
    procedureSteps: [
      "Digital panoramic dental checkup",
      "Plaque and tartar assessment",
      "Preventive polishing & remineralization",
      "Personalized at-home routine advisory"
    ],
    recommendedFor: "Every 6 months for adults and teenagers to maintain peak oral hygiene."
  },
  {
    id: "teeth-cleaning",
    name: "Teeth Cleaning",
    shortDescription: "Professional cleaning to maintain healthy teeth and gums.",
    fullDescription: "Ultrasonic scaling and prophylactic airflow polishing that effortlessly lifts stubborn plaque, coffee/tea stains, and calculus while safeguarding sensitive enamel and gum tissue.",
    icon: "Sparkles",
    benefits: [
      "Eliminates bad breath (halitosis) bacteria",
      "Prevents gingivitis and periodontal bone loss",
      "Lifts stubborn surface tea/coffee stains",
      "Gentle ultrasonic vibration with zero enamel abrasion"
    ],
    typicalDuration: "30 – 45 minutes",
    procedureSteps: [
      "Gingival margin evaluation",
      "Ultrasonic micro-vibration scaling",
      "Interdental floss polishing",
      "Protective enamel fluoride application"
    ],
    recommendedFor: "Patients seeking fresher breath, spotless teeth, and bleeding-free gums."
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    shortDescription: "Advanced treatment to save damaged or infected teeth.",
    fullDescription: "Rotary endodontics with precision apex locators to gently clean inflamed dental pulp, sterilize the root canals, and seal the natural tooth, eliminating severe pain in 1–2 visits.",
    icon: "Activity",
    benefits: [
      "Relieves deep throbbing toothaches immediately",
      "Saves the natural tooth from extraction",
      "Performed under gentle localized anesthesia",
      "Reinforced with long-lasting ceramic or zirconia crowns"
    ],
    typicalDuration: "60 – 90 minutes (often single-visit)",
    procedureSteps: [
      "Digital 3D canal mapping & localized numbing",
      "Gentle motorized rotary canal cleansing",
      "Antimicrobial canal sterilization & sealing",
      "Custom crown fitting for complete masticatory strength"
    ],
    recommendedFor: "Patients with acute toothache, temperature sensitivity, or deep decay reaching the nerve."
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    shortDescription: "Natural-looking tooth replacement solutions.",
    fullDescription: "Permanent biocompatible titanium fixtures seamlessly fused into the jawbone, topped with custom handcrafted ceramic crowns that look, bite, and feel like genuine teeth.",
    icon: "Anchor",
    benefits: [
      "Prevents bone loss and facial sagging",
      "Restores 100% natural chewing capability",
      "Does not damage adjacent healthy teeth",
      "Lifetime durability with proper oral hygiene"
    ],
    typicalDuration: "Initial placement ~45 min, followed by osseointegration",
    procedureSteps: [
      "3D CBCT digital bone density assessment",
      "Minimally invasive computer-guided implant placement",
      "Healing & stable osseointegration phase",
      "Precision porcelain-zirconia crown placement"
    ],
    recommendedFor: "Anyone missing one, several, or all natural teeth seeking permanent stability."
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    shortDescription: "Professional whitening for a brighter and more confident smile.",
    fullDescription: "Safe, chairside LED-activated whitening treatments that lift years of deep discoloration and beverage stains by up to 6–8 shades in a single comfortable clinical session.",
    icon: "Sun",
    benefits: [
      "Noticeably brighter teeth in under 60 minutes",
      "Safe, enamel-friendly pH neutral bleaching agents",
      "Includes desensitizing serum for zero post-treatment discomfort",
      "Long-lasting shine with take-home maintenance kit"
    ],
    typicalDuration: "45 – 60 minutes",
    procedureSteps: [
      "Initial baseline tooth shade measurement",
      "Protective gingival barrier application",
      "Application of medical-grade hydrogen peroxide formula",
      "Targeted cool-light LED illumination cycles"
    ],
    recommendedFor: "Weddings, special events, or everyday confidence boost for dull or yellowing teeth."
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortDescription: "Smile-enhancing treatments designed around your goals.",
    fullDescription: "Artistic porcelain veneers, direct composite bonding, and digital smile design that correct chips, uneven spacing, discolored edges, and minor dental misalignments.",
    icon: "Smile",
    benefits: [
      "Harmonious smile tailored to your facial proportions",
      "Durable stain-resistant ultra-thin ceramic veneers",
      "Conservative tooth structure preservation",
      "Preview your final smile with digital mockups"
    ],
    typicalDuration: "2 – 3 appointments",
    procedureSteps: [
      "Aesthetic digital photography & 3D scan",
      "Interactive digital smile preview & design",
      "Precision tooth preparation & temporary veneer trial",
      "Permanent bonding of custom cosmetic porcelain veneers"
    ],
    recommendedFor: "Patients with chipped teeth, gaps, enamel defects, or uneven tooth shapes."
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    shortDescription: "Solutions for straighter and healthier teeth.",
    fullDescription: "Discrete clear aligners (invisible trays) as well as modern low-friction ceramic brackets to systematically align crooked teeth, eliminate bite problems, and ensure ideal jaw alignment.",
    icon: "Layers",
    benefits: [
      "Virtually invisible clear aligner options",
      "Removable for effortless eating and oral hygiene",
      "Predictable 3D computer simulation of weekly progress",
      "Fewer clinic visits with smart remote milestone tracking"
    ],
    typicalDuration: "6 – 18 months depending on case complexity",
    procedureSteps: [
      "3D digital intraoral scanning (no goopy impressions)",
      "Orthodontic biomechanical treatment plan",
      "Custom medical-grade aligner delivery",
      "Bi-weekly aligner transition & check-ins"
    ],
    recommendedFor: "Teens and adults looking to straighten crowded, spaced, or rotated teeth discreetly."
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    shortDescription: "Gentle and friendly dental care for children.",
    fullDescription: "Specially designed dental visits for toddlers and children in an anxiety-free environment. Featuring pit-and-fissure sealants, fluoride treatments, painless fillings, and friendly habit coaching.",
    icon: "Baby",
    benefits: [
      "Gentle 'Tell-Show-Do' child psychology techniques",
      "Prevents early childhood milk-tooth decay",
      "Protective fissure sealants for deep chewing grooves",
      "Fun, cheerful setting with rewards and zero fear"
    ],
    typicalDuration: "30 – 40 minutes",
    procedureSteps: [
      "Comfortable introductory exploration of instruments",
      "Gentle examination & soft plaque cleaning",
      "Fissure sealant or topical fluoride defense application",
      "Fun child-friendly brushing demonstration"
    ],
    recommendedFor: "Infants with their first erupting tooth up to age 14 for cavity-free childhoods."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Dental Professionals",
    description: "Our dedicated dental specialists bring over a decade of combined clinical expertise in restorative, cosmetic, and pediatric care.",
    icon: "Award"
  },
  {
    title: "Personalized Treatment Plans",
    description: "No one-size-fits-all treatments. We thoroughly discuss clinical options, budgets, and recovery timelines with every patient.",
    icon: "UserCheck"
  },
  {
    title: "Modern Dental Technology",
    description: "Equipped with low-radiation digital radiography, intraoral high-def cameras, and rotary endodontic equipment for gentle care.",
    icon: "Microscope"
  },
  {
    title: "Comfortable Clinic Environment",
    description: "A calming ambiance, sterile operatories, soothing ambient music, and empathetic staff who prioritize your peace of mind.",
    icon: "Armchair"
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront fee structures with zero hidden charges. We provide complete estimates before any dental procedure begins.",
    icon: "CheckCircle2"
  },
  {
    title: "Patient-First Approach",
    description: "From flexible appointment schedules to prompt post-operative follow-up calls, your comfort and satisfaction come first.",
    icon: "HeartHandshake"
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    role: "Senior Dentist & Prosthodontist",
    qualification: "BDS, MDS (Prosthodontics & Crown-Bridge)",
    specialization: "Restorative Dentistry & Full Mouth Rehabilitation",
    experience: "10+ Years Experience",
    bio: "Dr. Priya Sharma is the chief clinical lead at Isha Dental Care. With over a decade of clinical experience in advanced prosthodontics and smile restoration, she is renowned for her gentle clinical touch and meticulous attention to functional aesthetics.",
    image: "/src/assets/images/doctor_priya_sharma_1790477108147.jpg",
    areasOfExpertise: ["Full Mouth Rehabilitation", "Crown & Bridge Precision", "Geriatric Dental Care", "TMJ Disorder Management"],
    schedule: "Mon - Sat: 9:00 AM - 4:00 PM"
  },
  {
    id: "dr-rahul-mehta",
    name: "Dr. Rahul Mehta",
    role: "Cosmetic & Implant Dentist",
    qualification: "BDS, MDS (Conservative Dentistry & Endodontics, Fellow ICOI)",
    specialization: "Cosmetic & Implant Dentistry",
    experience: "8+ Years Experience",
    bio: "Dr. Rahul Mehta specializes in micro-dentistry, porcelain veneer transformations, and computer-guided dental implants. His practice focuses on preserving natural tooth structure while engineering radiant, symmetrical smiles.",
    image: "/src/assets/images/doctor_rahul_mehta_1790477120690.jpg",
    areasOfExpertise: ["Single & Multiple Dental Implants", "Porcelain Veneers & Laminates", "Rotary Single-Visit Root Canals", "Digital Smile Design"],
    schedule: "Mon - Sat: 1:00 PM - 8:00 PM"
  },
  {
    id: "dr-ananya-patel",
    name: "Dr. Ananya Patel",
    role: "Pediatric Dentist",
    qualification: "BDS, MDS (Pedodontics & Preventive Dentistry)",
    specialization: "Pediatric Dentistry & Child Habit Counseling",
    experience: "6+ Years Experience",
    bio: "Dr. Ananya Patel brings warmth, patience, and joyful energy to pediatric dental care. Certified in child psychology techniques, she specializes in creating cheerful, stress-free dental visits for infants, children, and young teens.",
    image: "/src/assets/images/doctor_ananya_patel_1790477131997.jpg",
    areasOfExpertise: ["Child Behavior Shaping", "Cavity-Prevention Fissure Sealants", "Milk Tooth Pulpotomy & Crowns", "Space Maintainers"],
    schedule: "Mon, Wed, Fri & Sun: 10:00 AM - 2:00 PM"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "review-1",
    quote: "Dr. Sharma and the entire team made my treatment comfortable and stress-free. Highly recommended!",
    author: "Aarav Kulkarni",
    treatment: "Root Canal & Ceramic Crown",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    id: "review-2",
    quote: "The clinic is modern, clean and the staff is extremely friendly. My teeth cleaning was completely painless.",
    author: "Sneha Patil",
    treatment: "Ultrasonic Cleaning & Whitening",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: "review-3",
    quote: "Very professional service and excellent dental care. Got my dental implant done here with zero complications.",
    author: "Rohan Deshmukh",
    treatment: "Titanium Dental Implant",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: "review-4",
    quote: "One of the most comfortable dental experiences I've had. Dr. Ananya was so gentle with my 7-year-old daughter!",
    author: "Neha Joshi",
    treatment: "Pediatric Checkup & Fluoride",
    rating: 5,
    date: "2 months ago"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How often should I visit the dentist?",
    answer: "For most children and adults, we recommend a routine dental checkup and professional cleaning every 6 months. Regular visits enable us to catch minor plaque buildup, early enamel erosion, or gum sensitivity before they develop into painful or costly dental conditions."
  },
  {
    id: "faq-2",
    question: "Is teeth cleaning painful?",
    answer: "No, routine teeth cleaning (prophylaxis and ultrasonic scaling) is generally painless. You will feel mild vibrations and a gentle stream of cooling water. If you experience heightened tooth sensitivity or inflamed gums, our dentists can apply a topical numbing gel to ensure complete comfort throughout."
  },
  {
    id: "faq-3",
    question: "How long does a root canal take?",
    answer: "Thanks to modern rotary instruments and digital apex locators at Isha Dental Care, many root canal procedures can be completed in a single comfortable visit of approximately 60 to 90 minutes. In cases of severe infection, we may divide the treatment into two short visits with medicated antibacterial dressing."
  },
  {
    id: "faq-4",
    question: "Do you treat children?",
    answer: "Yes, absolutely! We love treating young patients. Dr. Ananya Patel, our dedicated pediatric specialist, uses positive reinforcement and gentle techniques to ensure kids enjoy their visits. We recommend bringing your child in as soon as their first tooth erupts or by their first birthday."
  },
  {
    id: "faq-5",
    question: "Do you provide emergency dental care?",
    answer: "Yes, we reserve dedicated daily priority slots for emergency patients experiencing severe toothaches, cracked or knocked-out teeth, lost fillings, or acute swelling. You can call our emergency line (+91 8147440264) for immediate triage advice and same-day treatment."
  },
  {
    id: "faq-6",
    question: "How can I book an appointment?",
    answer: "You can book easily right here on our website using the 'Book Appointment' form above. Alternatively, you can click the WhatsApp button on the bottom right or call us directly at +91 8147440264 during clinic hours. Our team promptly confirms your preferred slot."
  },
  {
    id: "faq-7",
    question: "What payment options are available?",
    answer: "We support diverse flexible payment methods for your convenience, including UPI (Google Pay, PhonePe, Paytm), all major credit and debit cards, cash, net banking, and flexible 0% interest EMI options for advanced treatments like dental implants, braces, and aligners."
  }
];
