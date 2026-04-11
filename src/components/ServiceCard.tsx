'use client';

import React from 'react';
import { Service } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import type { ServiceIconColor } from '@/types';

const ICON_COLOR_CLASSES: Record<ServiceIconColor, { badge: string; iconBg: string }> = {
  rose: { badge: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-200', iconBg: 'bg-rose-100 dark:bg-rose-500/30' },
  red: { badge: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-200', iconBg: 'bg-red-100 dark:bg-red-500/30' },
  amber: { badge: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-200', iconBg: 'bg-amber-100 dark:bg-amber-500/30' },
  emerald: { badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200', iconBg: 'bg-emerald-100 dark:bg-emerald-500/30' },
  blue: { badge: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-200', iconBg: 'bg-blue-100 dark:bg-blue-500/30' },
  violet: { badge: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-200', iconBg: 'bg-violet-100 dark:bg-violet-500/30' },
  teal: { badge: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-200', iconBg: 'bg-teal-100 dark:bg-teal-500/30' },
  indigo: { badge: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200', iconBg: 'bg-indigo-100 dark:bg-indigo-500/30' },
  sky: { badge: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-200', iconBg: 'bg-sky-100 dark:bg-sky-500/30' },
  orange: { badge: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-200', iconBg: 'bg-orange-100 dark:bg-orange-500/30' },
  pink: { badge: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-200', iconBg: 'bg-pink-100 dark:bg-pink-500/30' },
  cyan: { badge: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-200', iconBg: 'bg-cyan-100 dark:bg-cyan-500/30' },
  fuchsia: { badge: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-200', iconBg: 'bg-fuchsia-100 dark:bg-fuchsia-500/30' },
  lime: { badge: 'bg-lime-50 text-lime-600 dark:bg-lime-500/10 dark:text-lime-200', iconBg: 'bg-lime-100 dark:bg-lime-500/30' },
  slate: { badge: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-200', iconBg: 'bg-slate-200 dark:bg-slate-500/30' },
};

interface ServiceCardProps {
    service: Service;
    icon: LucideIcon;
    tag: string;
    iconColor: ServiceIconColor;
    isActive: boolean;
    onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, icon: Icon, tag, iconColor, isActive, onToggle }) => {
    const serviceName = service.name;
    const serviceDescription = service.description;
    const colors = ICON_COLOR_CLASSES[iconColor];

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isActive}
            className={`glass-card group cursor-pointer p-6 sm:p-7 text-left border transition-all duration-300 rounded-2xl w-full self-start ${
                isActive ? 'border-brand-500/60 shadow-lg' : 'border-brand-500/10 hover:border-brand-500/40'
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${colors.badge}`}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${colors.iconBg}`}>
                            <Icon className="w-3 h-3" />
                        </span>
                        <span>{tag}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 group-hover:text-accent transition-colors duration-300">
                        {serviceName}
                    </h3>
                </div>
                <span
                    className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-200 transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                    }`}
                >
                    <ChevronDown className="w-4 h-4" />
                </span>
            </div>

            {isActive && (
                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700 animate-fade-in">
                    <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed">
                        {serviceDescription}
                    </p>
                </div>
            )}
        </button>
    );
};

export default ServiceCard;