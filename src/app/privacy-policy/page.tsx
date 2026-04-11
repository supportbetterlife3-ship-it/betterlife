import React from 'react';
import { siteConfig } from '@/config/site';
import { demoContact } from '@/app/contact/contactDetails';

export const metadata = {
  title: `Privacy Policy | ${siteConfig.shortName}`,
  description: `Privacy notice for ${siteConfig.legalName}, explaining how we collect, use, and protect your personal data in Reading and across the UK.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Last updated: {new Date().toLocaleDateString('en-GB')}
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100">
          <section className="space-y-3">
            <p>
              At <span className="font-semibold">{siteConfig.brandName}</span>, we are committed to protecting the
              privacy of our clients and website visitors. This notice explains how we collect,
              use, and protect your personal information in line with UK data protection law, including the UK GDPR.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">1. Information We Collect</h2>
            <p>We only collect the information we need to provide our health and care services to you, which may include:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold">Personal Data</span> – such as your name, contact details, and address.
              </li>
              <li>
                <span className="font-semibold">Health Data (Special Category Data)</span> – such as relevant medical history
                or information about your care and support needs.
              </li>
              <li>
                <span className="font-semibold">Technical Data</span> – such as IP address and basic website usage information
                collected via cookies or similar technologies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">2. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes and legal bases:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold">Contract</span> – to assess your needs, deliver the care and services you have
                requested, and manage our relationship with you.
              </li>
              <li>
                <span className="font-semibold">Consent</span> – for specific activities, such as certain health data
                processing or optional marketing communications. You can withdraw your consent at any time.
              </li>
              <li>
                <span className="font-semibold">Legal Obligation</span> – to meet our responsibilities under UK healthcare,
                safeguarding, and safety regulations.
              </li>
              <li>
                <span className="font-semibold">Legitimate Interests</span> – to improve our services, respond to enquiries,
                and keep our website secure and functional, where this does not override your rights.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">3. Sharing Your Data &amp; Security</h2>
            <p>We do not sell your personal data to anyone. We may share your information only when necessary with:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold">Trusted healthcare partners or regulators</span> – such as the NHS, local
                authorities, or the Care Quality Commission (CQC), where this is required for your care or by law.
              </li>
              <li>
                <span className="font-semibold">Service providers</span> – such as IT, hosting, or system support providers
                who help us operate our services and who are required to keep your data secure and confidential.
              </li>
            </ul>
            <p>
              We use appropriate technical and organisational measures, including encrypted connections (SSL) and secure
              storage, to protect your information from loss, misuse, or unauthorised access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">4. How Long We Keep Your Data</h2>
            <p>
              We keep your personal data only for as long as is necessary for the purposes described in this notice, or as
              required to meet legal, regulatory, or professional obligations. Retention periods may vary depending on the
              nature of the service and the type of record.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">5. Your Rights</h2>
            <p>Under UK data protection law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Request access to the personal data we hold about you.</li>
              <li>Ask us to correct any inaccurate or incomplete information.</li>
              <li>Request the deletion of your data in certain circumstances.</li>
              <li>Restrict or object to certain types of processing.</li>
              <li>
                Withdraw consent where we rely on consent as the legal basis for processing (this does not affect past
                processing carried out before consent was withdrawn).
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details below. We may need to verify your identity
              before responding to your request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">6. Contact &amp; Complaints</h2>
            <p>
              If you have any questions about this privacy notice or how we handle your data, please contact our data
              protection lead:
            </p>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href={`mailto:${demoContact.email}`}
                  className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 underline-offset-2 hover:underline"
                >
                  {demoContact.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Address:</span>Reading, UK
              </p>
            </div>
        
          </section>
        </div>
      </div>
    </section>
  );
}

