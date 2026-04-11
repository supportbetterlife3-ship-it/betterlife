import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, PoundSterling, Clock, ArrowLeft, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { demoContact } from '@/app/contact/contactDetails';
import { getJobBySlug, listJobSlugParams } from '@/lib/db/jobs';

export const revalidate = 60;

interface JobDetails {
  _id: string;
  title: string;
  slug: string;
  location: string;
  salary: string;
  jobType: string;
  closingDate: string;
  description: string;
  imageUrl?: string;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return listJobSlugParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  let job: JobDetails | null = null;
  try {
    const j = await getJobBySlug(slug);
    if (j) {
      job = {
        _id: j._id,
        title: j.title,
        slug: j.slug,
        location: j.location,
        salary: j.salary,
        jobType: j.jobType,
        closingDate: j.closingDate,
        description: j.description,
        imageUrl: j.imageUrl,
      };
    }
  } catch {
    job = null;
  }

  if (!job) {
    return {
      title: `Job Not Found | ${siteConfig.shortName}`,
    };
  }

  return {
    title: `${job.title} | Careers - ${siteConfig.shortName}`,
    description: `${job.title} position at ${siteConfig.brandName} in ${job.location}`,
  };
}

export default async function JobDetailsPage({ params }: Props) {
  const { slug } = await params;
  let job: JobDetails | null = null;
  try {
    const j = await getJobBySlug(slug);
    if (j) {
      job = {
        _id: j._id,
        title: j.title,
        slug: j.slug,
        location: j.location,
        salary: j.salary,
        jobType: j.jobType,
        closingDate: j.closingDate,
        description: j.description,
        imageUrl: j.imageUrl,
      };
    }
  } catch {
    job = null;
  }

  if (!job) {
    notFound();
  }

  const closingDate = new Date(job.closingDate);
  const isOpen = closingDate > new Date();
  const daysUntilClosing = Math.ceil(
    (closingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-accent mb-8 font-semibold transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to careers
        </Link>

        <div className="glass-card overflow-hidden border border-brand-200/30 dark:border-slate-700 shadow-2xl">
          {job.imageUrl ? (
            <div className="max-h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={job.imageUrl} alt="" className="h-full w-full max-h-72 object-cover" />
            </div>
          ) : null}
          <div className="border-b border-accent dark:border-slate-700 bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-800 dark:via-teal-700 dark:to-sky-700 text-white p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">{job.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-semibold opacity-90">Location</p>
                <p className="text-lg font-medium inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-90">Salary</p>
                <p className="text-lg font-medium inline-flex items-center gap-2">
                  <PoundSterling className="w-4 h-4" />
                  {job.salary}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-90">Type</p>
                <p className="text-lg font-medium inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {job.jobType}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-90">Status</p>
                <p
                  className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${
                    isOpen
                      ? 'bg-emerald-500/15 text-emerald-100 border border-emerald-300/60'
                      : 'bg-rose-500/15 text-rose-100 border border-rose-300/60'
                  }`}
                >
                  <span className="text-lg">{isOpen ? '✓' : '✗'}</span>
                  {isOpen ? 'Open for applications' : 'Position closed'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div
              className={`mb-8 p-6 rounded-lg border-l-4 backdrop-blur-sm transition-all duration-300 ${
                isOpen
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 text-emerald-900 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-900 dark:text-rose-300'
              }`}
            >
              <p className="font-semibold text-lg">
                {isOpen ? (
                  <>
                    Applications close in <strong>{daysUntilClosing} days</strong> (
                    {closingDate.toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    )
                  </>
                ) : (
                  <>
                    This position closed on{' '}
                    <strong>
                      {closingDate.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </strong>
                  </>
                )}
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-accent mb-6">Job Description</h2>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-lg">
                {job.description}
              </p>
            </section>

            <div className="bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-50 dark:from-slate-800/50 dark:via-slate-800/60 dark:to-slate-700/60 rounded-xl p-8 border border-brand-500/30 dark:border-slate-600 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-accent mb-4">Ready to apply?</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
                If you&apos;re interested in this position, please contact us or send your CV to our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block btn-accent px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Contact us
                </Link>
                {isOpen && (
                  <a
                    href={`mailto:${demoContact.email}?subject=${encodeURIComponent(
                      `Application for ${job.title}`
                    )}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold border border-brand-500/70 text-accent bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-center"
                  >
                    <Mail className="w-4 h-4" />
                    Email your CV
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-accent mb-8">Other Vacancies</h2>
          <Link
            href="/careers"
            className="inline-block btn-accent px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse All Positions
          </Link>
        </div>
      </div>
    </div>
  );
}
