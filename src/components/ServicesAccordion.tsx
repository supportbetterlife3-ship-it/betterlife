'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { Service, type ServiceIconColor } from '@/types';
import type { LucideIcon } from 'lucide-react';
import {
  MoonStar,
  ShoppingBag,
  UtensilsCrossed,
  Home,
  Stethoscope,
  Pill,
  ClipboardList,
  Sparkles,
  Trees,
} from 'lucide-react';

interface ServiceWithIcon extends Service {
  icon: LucideIcon;
  tag: string;
  iconColor: ServiceIconColor;
}

// hard‑coded list of available services with short descriptions, icons and colors
const SERVICES: ServiceWithIcon[] = [
  {
    name: 'Night Support',
    description: 'Overnight assistance.',
    icon: MoonStar,
    tag: 'Overnight Assistance',
    iconColor: 'indigo',
  },
  {
    name: 'Errands',
    description: 'Grocery shopping.',
    icon: ShoppingBag,
    tag: 'Grocery Shopping',
    iconColor: 'amber',
  },
  {
    name: 'Home Care',
    description: 'House cleaning.',
    icon: Home,
    tag: 'House Cleaning',
    iconColor: 'emerald',
  },
  {
    name: 'Nutrition Support',
    description: 'Meal preparation.',
    icon: UtensilsCrossed,
    tag: 'Meal Preparation',
    iconColor: 'orange',
  },
  {
    name: 'Daily Living',
    description: 'Routine household tasks.',
    icon: ClipboardList,
    tag: 'Routine Household Tasks',
    iconColor: 'fuchsia',
  },
  {
    name: 'Medical Visits',
    description: 'Appointment assistance.',
    icon: Stethoscope,
    tag: 'Appointment Assistance',
    iconColor: 'teal',
  },
  {
    name: 'Medication Support',
    description: 'Prescription collection.',
    icon: Pill,
    tag: 'Prescription Collection',
    iconColor: 'violet',
  },
  {
    name: 'Wellbeing Activities',
    description: 'Indoor engagement.',
    icon: Sparkles,
    tag: 'Indoor Engagement',
    iconColor: 'pink',
  },
  {
    name: 'Community Access',
    description: 'Outdoor activities.',
    icon: Trees,
    tag: 'Outdoor Activities',
    iconColor: 'lime',
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

