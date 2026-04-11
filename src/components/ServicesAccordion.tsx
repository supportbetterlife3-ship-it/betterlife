'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { Service, type ServiceIconColor } from '@/types';
import type { LucideIcon } from 'lucide-react';
import {
 
  MoonStar,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Home,
  Stethoscope,
  Pill,
  SunMedium,
  Plane,
  Building2,
  ClipboardList,
  Users,
} from 'lucide-react';

interface ServiceWithIcon extends Service {
  icon: LucideIcon;
  tag: string;
  iconColor: ServiceIconColor;
}

// hard‑coded list of available services with short descriptions, icons and colors
const SERVICES: ServiceWithIcon[] = [


  {
    name: 'Overnight Care',
    description:
      'Night‑time support to ensure safety and comfort for those who need assistance around the clock.',
    icon: MoonStar,
    tag: 'Night care',
    iconColor: 'indigo',
  },
  {
    name: 'Shopping',
    description:
      'Help with purchasing groceries, clothing or other essentials either in‑person or online.',
    icon: ShoppingBag,
    tag: 'Errands',
    iconColor: 'amber',
  },
  {
    name: 'Cleaning',
    description: 'Light housekeeping to keep living spaces tidy and hygienic.',
    icon: Sparkles,
    tag: 'Household',
    iconColor: 'cyan',
  },
  {
    name: 'Meal Preparation',
    description:
      'Cooking nutritious meals according to dietary requirements and personal preferences.',
    icon: UtensilsCrossed,
    tag: 'Nutrition',
    iconColor: 'orange',
  },
  {
    name: 'General Household Duties',
    description: 'Assistance with everyday chores such as laundry, gardening and administration.',
    icon: Home,
    tag: 'Home life',
    iconColor: 'emerald',
  },
  {
    name: 'Health Appointments',
    description:
      'Accompanying clients to medical or therapy appointments and providing transport when needed.',
    icon: Stethoscope,
    tag: 'Appointments',
    iconColor: 'teal',
  },
  {
    name: 'Prescription Pick‑up',
    description:
      'Collecting medications from pharmacies and ensuring they are taken as directed.',
    icon: Pill,
    tag: 'Medication',
    iconColor: 'violet',
  },
  {
    name: 'Indoor Activities',
    description:
      'Engaging clients with games, crafts, reading or other stimulating indoor pastimes.',
    icon: Sparkles,
    tag: 'Wellbeing',
    iconColor: 'pink',
  },
  {
    name: 'Outdoor Activities',
    description:
      'Support for walks, excursions or sports to promote wellbeing and social interaction.',
    icon: SunMedium,
    tag: 'Out & about',
    iconColor: 'lime',
  },
  {
    name: 'Holiday Care',
    description:
      'Supervised care during vacations or special events away from the usual environment.',
    icon: Plane,
    tag: 'Breaks away',
    iconColor: 'sky',
  },
  {
    name: '24 Hour Supported Accommodation',
    description:
      'Around‑the‑clock assistance in a dedicated living setting for those needing intensive support.',
    icon: Building2,
    tag: '24/7 support',
    iconColor: 'slate',
  },
  {
    name: 'Personalised Support Plan',
    description: 'Bespoke care plans developed in collaboration with clients and families.',
    icon: ClipboardList,
    tag: 'Planning',
    iconColor: 'fuchsia',
  },
  {
    name: 'Group Activities',
    description: 'Facilitated social groups and community outings to encourage connection.',
    icon: Users,
    tag: 'Community',
    iconColor: 'blue',
  },
];

const ServicesAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, index) => (
        <ServiceCard
          key={service.name}
          service={service}
          icon={service.icon}
          tag={service.tag}
          iconColor={service.iconColor}
          isActive={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default ServicesAccordion;

