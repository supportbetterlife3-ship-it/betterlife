import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceArea from '@/components/ServiceArea';
import { siteConfig } from '@/config/site';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

export const metadata = {
  title: `Home | ${siteConfig.shortName}`,
  description: 'Thoughtful support for independent living',
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative min-h-0 lg:min-h-[85vh] flex items-center overflow-hidden">
        <div className="hero-mesh absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 md:py-10 lg:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <FadeInWhenVisible className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white">
                <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Thoughtful support
                </span>{' '}
                for independent living
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We are devoted to delivering outstanding wellbeing and care services within our community. Our group of
                specialists is focused on guiding you along your path to stronger health and self-reliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg bg-brand-500 hover:bg-brand-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Our Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible
              delay={0.08}
              className="w-full max-w-lg mx-auto lg:max-w-none space-y-4"
            >
              <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero2.jpg"
                  alt="Better Life Support teams offering care"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-[140px] sm:h-[180px] md:h-[200px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800">
                <Image
                  src="/hero.webp"
                  alt="Local wellness and community spirit"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <ServiceArea variant="compact" />
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic">
            &ldquo;Wherever the art of medicine is loved, there is also a love of humanity.&rdquo;
          </blockquote>
          <cite className="mt-3 block text-sm sm:text-base text-brand-600 dark:text-brand-400 font-semibold not-italic">
            — Hippocrates
          </cite>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400 mb-2">
              What we offer
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Our Core Services
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto px-1">
              Comprehensive healthcare solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                title: 'Overnight Care',
                description:
                  'Night‑time support to ensure safety and comfort for those who need assistance around the clock.',
                icon: '🌙',
              },
              {
                title: 'Cleaning',
                description: 'Light housekeeping to keep living spaces tidy and hygienic.',
                icon: '✨',
              },
              {
                title: 'Lifestyle Support',
                description: 'Shopping, cooking, cleaning, and activities to enhance your quality of life',
                icon: '🏠',
              },
            ].map((service, index) => (
              <Link
                key={index}
                href="/services"
                className="group block glass-card p-5 sm:p-6 md:p-8 text-center hover:shadow-xl hover:border-brand-500/30 dark:hover:border-brand-400/30 border-2 border-transparent transition-all duration-300 rounded-xl sm:rounded-2xl"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-600 dark:text-brand-400 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/services"
              className="inline-flex items-center justify-center btn-accent px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02]"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 relative bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-500/10 to-brand-600/5 dark:from-brand-500/15 dark:to-brand-600/10 border border-brand-500/20 dark:border-brand-400/20 p-6 sm:p-8 md:p-12 lg:p-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
              Contact us today to learn more about how we can support your health and wellness journey.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center btn-accent px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
