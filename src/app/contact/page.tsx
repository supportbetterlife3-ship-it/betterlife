import React from 'react';
import { Phone, Mail, Clock, MapPin, ArrowRight, Facebook, Instagram } from 'lucide-react';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/config/site';
import { demoContact } from './contactDetails';

export const metadata = {
  title: `Contact Us | Reading Care Provider | ${siteConfig.shortName}`,
  description:
    'Get in touch with Better Life Support in Reading. Phone, email, address, and contact form available.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <FadeInWhenVisible className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-800 dark:text-white max-w-2xl mx-auto">
            Get in touch with our team. We&apos;re here to help and answer any questions you may have.
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 text-center group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-3">Phone</h3>
            {demoContact.phones.map((p) => (
              <p key={p.tel} className="text-slate-900 dark:text-white mb-2 last:mb-0">
                <a
                  href={`tel:${p.tel}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-semibold"
                >
                  {p.display}
                </a>
              </p>
            ))}
          </div>

          <div className="glass-card p-8 text-center group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-3">Email</h3>
            <p className="text-slate-900 dark:text-white mb-4">
              <a
                href={`mailto:${demoContact.email}`}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-semibold break-all"
              >
                {demoContact.email}
              </a>
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={demoContact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-[#1877F2] hover:text-[#0f5ec2] hover:border-[#1877F2] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={demoContact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram profile"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 text-[#E4405F] hover:text-[#cc2e4a] hover:border-[#E4405F] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="glass-card p-8 text-center group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-3">Business Hours</h3>
            <p className="text-slate-900 dark:text-white mb-2">
              <span className="font-semibold">Mon–Fri:</span> 9am–5pm
            </p>
            <p className="text-slate-800 dark:text-white text-sm">
              Closed Saturdays, Sundays, &amp; Public Holidays
            </p>
          </div>
        </div>

        <section className="mb-16">
          <ContactForm />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 text-center lg:text-left">
            <div className="flex flex-col items-center lg:flex-row lg:items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50">Our Location</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-2">{siteConfig.brandName}</h3>
                <p className="text-slate-900 dark:text-white leading-relaxed">
                  Reading
                  <br />
                  United Kingdom
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Service area</h4>
                <p className="text-slate-900 dark:text-white">
                  We serve Reading, UK, with professional health and care services for independent living.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden p-0">
            <iframe
              title={`${siteConfig.brandName} location map`}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d17866!2d-0.9787475!3d51.4551201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-600 dark:via-teal-500 dark:to-sky-500 text-white px-6 py-10 sm:px-12 sm:py-12 text-center shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-lg text-white/90 mb-4">
            Call us or send an email to learn more about how we can support you.
          </p>
          <p className="text-sm text-white/80 mb-6">
            We aim to respond to all enquiries within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${demoContact.phones[0]?.tel ?? ''}`}
              className="inline-flex items-center justify-center rounded-full bg-white text-brand-700 px-6 py-3 text-sm font-semibold shadow-sm hover:bg-slate-100 transition-colors"
            >
              Call us now
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href={`mailto:${demoContact.email}`}
              className="inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Email our team
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
