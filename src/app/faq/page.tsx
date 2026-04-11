import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `FAQ | ${siteConfig.shortName}`,
  description: `Frequently asked questions about support, care at home, and how to get started with ${siteConfig.brandName}.`,
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What kind of people do you support?',
    a: 'We support adults aged 18 and over who may need help with daily living and independent skills.',
  },
  {
    q: 'Do you support people with autism?',
    a: 'Yes, we provide tailored support for autistic adults based on their individual needs and goals.',
  },
  {
    q: 'Do you support people with mental health needs?',
    a: 'Yes, we support individuals living with mental health conditions by offering compassionate, person-centred care.',
  },
  {
    q: 'Do you support people with learning disabilities?',
    a: 'Yes, we support people with learning disabilities to live as independently and safely as possible.',
  },
  {
    q: 'What age group do you support?',
    a: 'We support adults aged 18 and above.',
  },
  {
    q: 'Are staff available all the time?',
    a: 'Yes, our staff are available 24 hours a day, 7 days a week to support you whenever you need us.',
  },
  {
    q: 'Can you come to my home to provide care?',
    a: 'Yes, we can come to your home and provide the care and support you need at a time that suits you.',
  },
  {
    q: 'What kind of support do you provide?',
    a: 'We offer help with daily living, general support, and wellbeing.',
  },
  {
    q: 'Can I choose the times I receive support?',
    a: 'Yes, we work with you to create a schedule that fits your needs and preferences.',
  },
  {
    q: 'Is your support personalised?',
    a: 'Absolutely. We tailor all our support plans to meet your individual needs and goals.',
  },
  {
    q: 'How do I get started?',
    a: 'You can contact us directly, and we’ll guide you through the process and arrange an initial assessment.',
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400 mb-3">
            Help centre
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently asked questions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Quick answers about our support services. If you need more detail,{' '}
            <Link href="/contact" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              contact us
            </Link>
            .
          </p>
        </header>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group glass-card border border-slate-200/80 dark:border-slate-700 rounded-xl px-5 py-1 open:shadow-md transition-shadow"
            >
              <summary className="cursor-pointer list-none py-4 font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <span className="shrink-0 text-brand-600 dark:text-brand-400 text-xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="pb-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/80 pt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
