import { siteConfig } from '@/config/site';
import { demoContact } from '@/app/contact/contactDetails';

const themeInlineScript = `(function(){try{const t=localStorage.getItem('theme');const p=window.matchMedia('(prefers-color-scheme: dark)').matches;const d=t==='dark'||(!t&&p);const h=document.documentElement;if(d){h.classList.add('dark');h.style.colorScheme='dark'}else{h.classList.remove('dark');h.style.colorScheme='light'}}catch(e){}})()`;

export function getThemeInitScript(): string {
  return themeInlineScript;
}

/** Organization + WebSite JSON-LD for root layout. */
export function getRootJsonLd() {
  const primaryUkTel = demoContact.phones[0]?.tel ?? '';
  const telephoneIntl = primaryUkTel ? `+44${primaryUkTel.slice(1)}` : '';
  const orgId = `${siteConfig.siteUrl}/#organization`;
  const websiteId = `${siteConfig.siteUrl}/#website`;

  const organization = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}${siteConfig.assets.logoPath}`,
    image: `${siteConfig.siteUrl}${siteConfig.assets.heroPath}`,
    email: demoContact.email,
    ...(telephoneIntl ? { telephone: telephoneIntl } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '514 Oxford Road',
      addressLocality: 'Reading',
      postalCode: 'RG30 1EG',
      addressCountry: 'GB',
    },
    sameAs: [demoContact.social.facebook, demoContact.social.instagram],
    areaServed: ['Reading', 'UK'],
    serviceType: [
      'Supported living in Reading',
      'Private supported living',
      'Supported household',
      'Independent living',
      'Prompting houses',
      'Self care support',
      'Support for special needs kids',
      'Learning disability support',
      'Autism and other spectrums',
      'Down syndrome support',
      'ADHD support',
    ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteConfig.siteUrl,
    name: siteConfig.brandName,
    inLanguage: 'en-GB',
    publisher: { '@id': orgId },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [website, organization],
  };
}
