export type Project = {
  id: number;
  name: string;
  location: string;
  units: string;
  image: string;
  category: string;
  description?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: '70 Fisk Street',
    location: 'Jersey City, NJ',
    units: '44 Units',
    image: '/images/projects/70-fisk-street.jpg',
    category: 'new-jersey',
    description: 'Complete door, frame, and hardware package for luxury residential development.',
  },
  {
    id: 2,
    name: 'Halo Newark Phase 1',
    location: 'Newark, NJ',
    units: '303 Units',
    image: '/images/projects/halo-newark.jpg',
    category: 'new-jersey',
    description: 'Large-scale multifamily project with fire-rated assemblies throughout.',
  },
  {
    id: 3,
    name: 'Harrison Grand',
    location: 'Harrison, NY',
    units: '31 Units',
    image: '/images/projects/harrison-grand.jpg',
    category: 'new-york',
    description: 'Boutique residential building featuring premium interior doors and hardware.',
  },
  {
    id: 4,
    name: 'Allure 258',
    location: 'East Orange, NJ',
    units: '203 Units',
    image: '/images/projects/allure-258.jpeg',
    category: 'new-jersey',
    description: 'Modern apartment complex with full hollow metal and wood door package.',
  },
  {
    id: 5,
    name: 'Rainbow Village',
    location: 'Duluth, GA',
    units: '36 Units',
    image: '/images/projects/rainbow-village.jpg',
    category: 'georgia',
    description: 'Community housing development with durable commercial-grade doors.',
  },
  {
    id: 6,
    name: '15 Parkview',
    location: 'Bronxville, NY',
    units: '60 Units',
    image: '/images/projects/15-parkview.jpg',
    category: 'new-york',
    description: 'Upscale residential tower with custom millwork and entry systems.',
  },
  {
    id: 7,
    name: 'Madison 2020',
    location: 'Reading, PA',
    units: '85 Units',
    image: '/images/projects/madison-2020.jpg',
    category: 'pennsylvania',
    description: 'Mixed-use development featuring interior and exterior door solutions.',
  },
  {
    id: 8,
    name: 'Jersey Walk',
    location: 'Jersey City, NJ',
    units: '274 Units',
    image: '/images/projects/jersey-walk.jpg',
    category: 'new-jersey',
    description: 'Major residential project with comprehensive door and hardware scope.',
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'new-jersey', label: 'New Jersey' },
  { id: 'new-york', label: 'New York' },
  { id: 'pennsylvania', label: 'Pennsylvania' },
  { id: 'georgia', label: 'Georgia' },
];
