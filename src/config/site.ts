const defaultSiteUrl = 'https://betterlifesupport.co.uk';

/** Site branding and canonical URL (`NEXT_PUBLIC_SITE_URL` overrides for deploys). */
export const siteConfig = {
  brandName: 'Better Life Support',
  shortName: 'Better Life Support',
  legalName: 'Better Life Support Ltd',
  siteUrl: (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) || defaultSiteUrl,
  assets: {
    logoPath: '/logo.png',
    heroPath: '/hero2.jpg',
  },
} as const satisfies {
  brandName: string;
  shortName: string;
  legalName: string;
  siteUrl: string;
  assets: { logoPath: string; heroPath: string };
};
