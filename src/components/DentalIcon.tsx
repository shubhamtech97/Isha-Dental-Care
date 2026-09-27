import React from 'react';
import {
  GraduationCap,
  Cpu,
  HeartPulse,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Activity,
  Anchor,
  Sun,
  Smile,
  Layers,
  Baby,
  Award,
  UserCheck,
  Microscope,
  CheckCircle2,
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  ChevronDown,
  Check,
  Star,
  MessageCircle,
  X,
  Menu,
  ArrowRight,
  ExternalLink,
  Shield,
  Stethoscope,
  Sparkle,
  Zap,
  Info
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const DentalIcon: React.FC<IconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'ClockAlert':
      return <AlertCircle className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Anchor':
      return <Anchor className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'UserCheck':
      return <UserCheck className={className} />;
    case 'Microscope':
      return <Microscope className={className} />;
    case 'Armchair':
      return <HeartPulse className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'ChevronRight':
      return <ChevronRight className={className} />;
    case 'ChevronDown':
      return <ChevronDown className={className} />;
    case 'Check':
      return <Check className={className} />;
    case 'Star':
      return <Star className={className} />;
    case 'MessageCircle':
      return <MessageCircle className={className} />;
    case 'X':
      return <X className={className} />;
    case 'Menu':
      return <Menu className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'Stethoscope':
      return <Stethoscope className={className} />;
    case 'Sparkle':
      return <Sparkle className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    default:
      return <Info className={className} />;
  }
};

export const ToothLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 text-teal-600' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2.5 11 .5 1.8 2 3 3.5 3s2-1.2 2.5-3c.5-1.8 1.5-4 2-6 .5-2 1.5-4 1.5-5 0-3.5-2.5-6-6-6Z" />
      <path d="M10 7.5c1-1 3-1 4 0" />
      <path d="M9 13c1 2 2 3 3 3s2-1 3-3" />
    </svg>
  );
};
