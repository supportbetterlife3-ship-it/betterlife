import React from 'react';
import { MapPin } from 'lucide-react';

const AREA_LINE = 'Reading, UK';

type Variant = 'compact' | 'card' | 'inline';

interface ServiceAreaProps {
  variant?: Variant;
  className?: string;
}

const ServiceArea: React.FC<ServiceAreaProps> = ({ variant = 'card', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 py-4 px-4 ${className}`}>
        <div className="flex items-center gap-2 text-brand-500 dark:text-brand-400">
          <MapPin className="w-4 h-4 shrink-0" aria-hidden />
          <span className="text-sm font-semibold">Our service area</span>
        </div>
        <p className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          {AREA_LINE}
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`rounded-lg bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-200/80 dark:border-slate-800/80 ${className}`}>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-brand-500 dark:text-brand-400 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Where we serve</p>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">{AREA_LINE}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl sm:rounded-2xl border border-brand-500/25 dark:border-brand-400/25 bg-gradient-to-br from-brand-500/8 to-brand-500/4 dark:from-brand-500/12 dark:to-brand-500/6 p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-500/20 dark:bg-brand-500/25">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600 dark:text-brand-400" aria-hidden />
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Our service area</span>
      </div>
      <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-slate-900/60 text-brand-700 dark:text-brand-300 border border-brand-500/20 dark:border-brand-400/20 shadow-sm">
        {AREA_LINE}
      </span>
    </div>
  );
};

export default ServiceArea;
