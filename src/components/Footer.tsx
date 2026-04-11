import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { demoContact } from '@/app/contact/contactDetails';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-t border-white/10 dark:border-slate-800/50 text-slate-900 dark:text-slate-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* 4-Column Layout for Desktop, Single Column on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    {/* Column 1: Brand & Mission */}
                    <div className="group text-center md:text-left">
                      
                        <p className="text-sm text-slate-900 dark:text-white leading-relaxed">
                            Providing compassionate care for independent living with professional support and dedicated service excellence.
                        </p>
                        {/* Social links */}
                        <div className="mt-4 flex justify-center md:justify-start gap-4">
                            <a
                                href={demoContact.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Facebook page"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-[#1877F2] hover:text-[#0f5ec2] hover:border-[#1877F2] transition-colors duration-200"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={demoContact.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Instagram profile"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-[#E4405F] hover:text-[#cc2e4a] hover:border-[#E4405F] transition-colors duration-200"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
                            <li>
                                <Link href="/" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Information */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Contact</h4>
                        <div className="text-sm space-y-3">
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">Phone:</p>
                                {demoContact.phones.map((p) => (
                                    <p key={p.tel}>
                                        <a
                                            href={`tel:${p.tel}`}
                                            className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium"
                                        >
                                            {p.display}
                                        </a>
                                    </p>
                                ))}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">Email:</p>
                                <p>
                                    <a
                                        href={`mailto:${demoContact.email}`}
                                        className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium"
                                    >
                                        {demoContact.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Legal & Hours */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Business Hours</h4>
                        <div className="text-sm space-y-3">
                            <p>
                                <span className="font-semibold text-slate-900 dark:text-white">Mon–Fri:</span> <span className="text-slate-900 dark:text-white">9am–5pm</span>
                            </p>
                            <p className="text-slate-700 dark:text-white text-xs">
                                Closed on Saturdays, Sundays & Public Holidays
                            </p>
                            <hr className="my-4 border-slate-200 dark:border-slate-800" />
                            <Link
                                href="/privacy-policy"
                                className="text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 text-xs font-medium"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-700 dark:text-white space-y-1">
                    <p className="font-medium">Built by <a href="https://linktr.ee/arjunpangeni" target="_blank">Arjun pangeni</a></p>
                    <p>&copy; {currentYear} {siteConfig.brandName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
