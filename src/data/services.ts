import { 
  Calculator, 
  Ruler, 
  FileText, 
  Truck, 
  Wrench, 
  Key,
  Shield,
  Users
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: typeof Calculator;
};

export const services: Service[] = [
  {
    id: 'estimating',
    title: 'Estimating',
    description: 'Our experienced estimating staff reviews your plans and prepares accurate bids promptly. We work with architects and GCs to ensure complete scope coverage.',
    icon: Calculator,
  },
  {
    id: 'field-measure',
    title: 'Field Measuring',
    description: 'Our skilled measuring team confirms all technical details on-site, preparing precise as-built drawings to ensure smooth installation.',
    icon: Ruler,
  },
  {
    id: 'shop-drawings',
    title: 'Shop Drawings',
    description: 'Detailed submittals and shop drawings prepared by our technical team, coordinated with all project stakeholders for approval.',
    icon: FileText,
  },
  {
    id: 'deliveries',
    title: 'Supervised Deliveries',
    description: 'Deliveries are administered and monitored by our project site managers. Nationwide shipping with careful coordination.',
    icon: Truck,
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Professional installation services throughout the tristate area. Our crews handle everything from doors to finish hardware.',
    icon: Wrench,
  },
  {
    id: 'keying',
    title: 'Keying & Hardware',
    description: 'Complete keying schedules and hardware coordination. Master key systems, access control integration, and final hardware sets.',
    icon: Key,
  },
];

export const products = [
  {
    id: 'interior-doors',
    title: 'Interior Doors',
    description: 'Wood, MDF, and hollow core doors for residential and commercial applications.',
    image: '/images/products/interior-doors.jpg',
  },
  {
    id: 'exterior-doors',
    title: 'Exterior & Entry Doors',
    description: 'Fiberglass, steel, and wood entry systems built for security and aesthetics.',
    image: '/images/products/exterior-doors.jpg',
  },
  {
    id: 'hollow-metal',
    title: 'Hollow Metal',
    description: 'Commercial-grade hollow metal doors and frames for durability and fire protection.',
    image: '/images/products/hollow-metal.jpg',
  },
  {
    id: 'fire-rated',
    title: 'Fire-Rated Assemblies',
    description: 'Code-compliant fire-rated doors, frames, and hardware assemblies.',
    image: '/images/products/fire-rated.jpg',
  },
  {
    id: 'hardware',
    title: 'Door Hardware',
    description: 'Hinges, locksets, closers, exit devices, and specialty hardware.',
    image: '/images/products/hardware.jpg',
  },
  {
    id: 'molding',
    title: 'Molding & Millwork',
    description: 'Base, casing, crown, and custom millwork profiles.',
    image: '/images/products/molding.jpg',
  },
];

export const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50K+', label: 'Doors Supplied' },
  { value: '25+', label: 'Years Experience' },
  { value: '48', label: 'States Delivered' },
];

export const values = [
  {
    title: 'Trust',
    description: 'We\'ve built lasting relationships with builders and developers across the nation through reliable service and honest pricing.',
    icon: Shield,
  },
  {
    title: 'Experience',
    description: 'Over 25 years in the industry means we\'ve seen it all. Our team knows how to handle complex projects and tight timelines.',
    icon: Users,
  },
  {
    title: 'Efficiency',
    description: 'From estimating to final punch, we streamline the process so your project stays on schedule and on budget.',
    icon: Calculator,
  },
];
