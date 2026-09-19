export type PropertyType = 'commercial' | 'residential' | 'industrial' | 'multi-family';

export type ServiceCategory = 'commercial' | 'residential' | 'specialty' | 'emergency';

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  materials: string[];
  warrantyYears: number | string;
  iconName: string;
  heroImage: string;
  diagramTitle?: string;
  systemLayers?: { layer: number; name: string; function: string }[];
  processSteps: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  technicalSpecs: { label: string; value: string }[];
}

export interface ServiceArea {
  id: string;
  slug: string;
  city: string;
  state: string;
  county: string;
  zipCodes: string[];
  description: string;
  climateFactors: string[];
  turnaroundTime: string;
  featuredProjectsCount: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  serviceCategory: ServiceCategory;
  serviceSlug: string;
  location: string;
  sqFt: number;
  pitch: string;
  material: string;
  completedDate: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  galleryImages: string[];
  featured: boolean;
  technicalHighlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'commercial' | 'residential' | 'metal' | 'inspection' | 'restoration';
  imageUrl: string;
  altText: string;
  caption: string;
  year: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  roleOrNeighborhood: string;
  serviceRendered: string;
  rating: number;
  date: string;
  quote: string;
  verifiedInspection: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'inspection' | 'replacement' | 'storm' | 'commercial';
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'scheduled' | 'completed' | 'closed';

export interface Lead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  propertyType: PropertyType;
  serviceRequested: string;
  status: LeadStatus;
  urgency: 'routine' | 'urgent' | 'emergency';
  notes?: string;
  source: string;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  propertyType: PropertyType;
  approximateSqFt: number;
  pitchType: 'flat' | 'low' | 'medium' | 'steep';
  materialPreference: string;
  timeframe: 'immediate' | '1-3_months' | '3-6_months' | 'planning';
  description: string;
  calculatedEstimateLow?: number;
  calculatedEstimateHigh?: number;
  status: LeadStatus;
  notes?: string;
}

export interface InspectionRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  propertyType: PropertyType;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon';
  thermalDroneRequested: boolean;
  activeLeaks: boolean;
  notes?: string;
  status: LeadStatus;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: 'page_view' | 'cta_click' | 'phone_click' | 'quote_start' | 'quote_submit' | 'inspection_submit' | 'contact_submit';
  path: string;
  meta?: Record<string, any>;
}

export interface BusinessConfig {
  name: string;
  legalEntity: string;
  licenseNumber: string;
  insuranceCoverage: string;
  primaryPhone: string;
  emergencyPhone: string;
  email: string;
  dispatchAddress: string;
  serviceRadiusMiles: number;
  hoursWeekday: string;
  hoursSaturday: string;
  emergencyDispatchAvailability: string;
  primaryServiceArea: string;
  certifications: string[];
  yearsInBusiness?: number;
}
