import TeamMember from '@/components/TeamMember';
import ServiceArea from '@/components/ServiceArea';
import { siteConfig } from '@/config/site';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

export const metadata = {
  title: `About Us | ${siteConfig.shortName}`,
  description: `Meet our team of dedicated professionals at ${siteConfig.brandName}. Learn about our mission, vision, and values that drive our compassionate care for independent living in the UK.`,
};

const teamMembers = [
  {
    name: 'Md Mehedi Hasan',
    role: 'Director',
    photo: '/mdmehendi.jpeg',
  },
  {
    name: 'Anns Basnet',
    role: 'Head of Operations',
    photo: '/anns.webp',
  },
   {
    name: 'Ifthiar Ahmed Farhan',
    role: 'Commercial Lead',
    photo: '/ifthiar.png',
  },
  {
    name: 'Maimuna Hossain Rashmi',
    role: 'HR Manager',
    photo: '/maimuna.jpg',
  },
   {
    name: 'Yvonne Mnyani',
    role: 'Business Advisor',
    photo: '/yvone.webp',
  }
  ,
   {
    name: 'Kemy Karki',
    role: 'Team Leader',
    photo: '/kemy.webp',
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <FadeInWhenVisible className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400 mb-3">
              About {siteConfig.brandName}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent">
              Caring support
              </span>{' '}
              for independent living across the UK
            </h1>
            <div className="space-y-5 text-base sm:text-lg text-slate-700 dark:text-slate-100 leading-relaxed">
              <p>
                {siteConfig.brandName} is a community-driven organisation providing high-quality health and care
                services for people living independently. We blend professional knowledge with heartfelt compassion to
                help individuals feel secure, respected, and confident.
              </p>
              <p>
                Our skilled, multi-disciplinary team has broad experience in health and social care. We collaborate
                closely with individuals, families, and local partners to develop tailored support that suits everyday
                life&mdash;encouraging dignity, independence, and overall wellbeing.
              </p>
              <div className="mt-6 max-w-2xl mx-auto">
                <ServiceArea variant="card" />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/30">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 text-center">
                Why families trust us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 p-5 text-center">
                  <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">reliable support when it matters most</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 p-5 text-center">
                  <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">100%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">person‑centred care plans</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 p-5 text-center">
                  <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">Local</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Reading, UK</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                Every visit, every conversation, and every care plan is guided by our promise to treat people the way we
                would want our own families to be treated.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        <section className="mb-16 md:mb-24">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-700 via-teal-600 to-sky-600 text-white p-8 sm:p-10 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-base sm:text-lg leading-relaxed opacity-95">
                To enable people to live independently, safely, and with dignity by delivering reliable, compassionate, and
                truly person‑centred care in the comfort of their own homes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-3">Our Vision</h2>
                <p className="text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed">
                  A community where every individual – regardless of age, background, or health needs – has access to
                  respectful, culturally sensitive support that helps them live life on their own terms.
                </p>
              </div>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-4">Our Values</h2>
                <ul className="text-base sm:text-lg space-y-2 text-slate-900 dark:text-white">
                  <li>✓ Compassion &amp; empathy in every interaction</li>
                  <li>✓ Quality &amp; clinical excellence you can rely on</li>
                  <li>✓ Integrity, transparency, and professionalism</li>
                  <li>✓ Person‑centred care, never one‑size‑fits‑all</li>
                  <li>✓ Respect, dignity, and cultural understanding</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-3 text-center">Meet Our Team</h2>
          <p className="text-center text-slate-900 dark:text-white mb-10 text-base sm:text-lg">
            Dedicated team committed to delivering excellent care
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm">
                <TeamMember member={member} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
