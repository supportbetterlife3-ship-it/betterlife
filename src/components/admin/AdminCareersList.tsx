'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type JobRow = {
  _id: string;
  title: string;
  slug: string;
  location: string;
  published: boolean;
  closingDate: string;
  imageUrl?: string;
};

export default function AdminCareersList() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(
          (data as JobRow[]).map((j) => ({
            ...j,
            closingDate: typeof j.closingDate === 'string' ? j.closingDate : new Date(j.closingDate).toISOString(),
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this job?')) return;
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Careers</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage job listings on the careers page.</p>
        </div>
        <Link
          href="/admin/dashboard/careers/new"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Add role
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <p className="p-8 text-center text-slate-600 dark:text-slate-300">Loading…</p>
        ) : jobs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300">No jobs yet.</p>
            <Link
              href="/admin/dashboard/careers/new"
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Create a listing
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {jobs.map((j) => (
              <li key={j._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0 flex gap-4">
                  <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 sm:block">
                    {j.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={j.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{j.title}</p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {j.location} · closes{' '}
                      {new Date(j.closingDate).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        j.published
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {j.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/careers/${j.slug}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/dashboard/careers/${j._id}/edit`}
                    className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(j._id)}
                    className="rounded-lg text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
