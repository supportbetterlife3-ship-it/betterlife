import Link from 'next/link';
import { MapPin, PoundSterling, Clock, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { listPublishedJobs } from '@/lib/db/jobs';

export const revalidate = 60;

export const metadata = {
  title: `Careers | ${siteConfig.shortName}`,
  description: 'Join our team and make a difference in healthcare',
};

export default async function CareersPage() {
  let jobs: Awaited<ReturnType<typeof listPublishedJobs>> = [];
  try {
    jobs = await listPublishedJobs();
  } catch {
    jobs = [];
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent mb-4">
            Careers at {siteConfig.brandName}
          </h1>
          <p className="text-lg sm:text-xl text-slate-800 dark:text-white max-w-2xl mx-auto">
            Join our team and help us provide exceptional care. We&apos;re looking for people who are kind, reliable, and
            passionate about making a difference.
          </p>
        </section>

        <div className="space-y-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => {
              const closingDate = job.closingDate ? new Date(job.closingDate) : null;
              const isOpen = closingDate ? closingDate > new Date() : true;

              return (
                <div
                  key={job._id}
                  className="glass-card overflow-hidden border border-brand-500/10 hover:border-brand-500/40 group"
                >
                  {job.imageUrl ? (
                    <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={job.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 group-hover:text-accent transition-colors">
                          {job.title}
                        </h2>
                        {closingDate && (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border ${
                              isOpen
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-500/70'
                                : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-500/70'
                            }`}
                          >
                            <span className="text-lg leading-none">{isOpen ? '●' : '✕'}</span>
                            {isOpen ? 'Open' : 'Closed'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-900 dark:text-white">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">
                          <MapPin className="w-3 h-3" />
                          <span className="font-medium">{job.location}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">
                          <PoundSterling className="w-3 h-3" />
                          <span className="font-medium">{job.salary}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{job.jobType}</span>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-2 btn-accent px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                    >
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {closingDate && (
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Closing date:{' '}
                      <span className="text-accent">
                        {closingDate.toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </p>
                  )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="glass-card p-12 text-center">
              <p className="text-slate-900 dark:text-white text-lg mb-4">We don&apos;t have any open positions at the moment.</p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Please check back later or send us your CV for future opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 btn-accent px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
