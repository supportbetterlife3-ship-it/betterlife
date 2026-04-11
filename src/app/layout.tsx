import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AuthSessionProvider } from '@/components/AuthSessionProvider';
import { siteConfig } from '@/config/site';
import { getRootJsonLd, getThemeInitScript } from '@/lib/jsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | Supported Living in Reading and Berkshire`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    `${siteConfig.brandName} provides high-quality supported living and independent living care in Reading, Berkshire and surrounding areas, specialising in learning disabilities, autism, ADHD and complex needs.`,
  alternates: {
    canonical: '/',
  },
  keywords: [
    siteConfig.brandName,
    'supported living in Reading',
    'private supported living',
    'supported household',
    'independent living',
    'prompting houses',
    'self care support',
    'special needs kids support',
    'learning disability support',
    'autism support',
    'autism spectrum support',
    'Down syndrome support',
    'ADHD support',
    'supported living Berkshire',
    'supported living Slough',
    'supported living Oxfordshire',
    'supported living Buckinghamshire',
    'supported living Greater London',
    'home care Reading',
    'domiciliary care Reading',
    'supported living services UK',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${siteConfig.brandName} | Supported Living & Independent Living Care`,
    description:
      'Supported living and independent living services in Reading, Berkshire and surrounding areas for adults and children with learning disabilities, autism, ADHD and complex needs.',
    url: '/',
    type: 'website',
    siteName: siteConfig.brandName,
    locale: 'en_GB',
    images: [
      {
        url: '/hero2.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.brandName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} | Supported Living & Independent Living Care`,
    description:
      'Supported living and independent living services in Reading, Berkshire and surrounding areas for adults and children with learning disabilities, autism, ADHD and complex needs.',
    images: ['/hero2.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.ico',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getRootJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript(),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="w-full min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 overflow-x-hidden transition-colors duration-300">
        <AuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="theme">
            <ScrollToTop />
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}