'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function closingInputValue(iso: string) {
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export type JobFormInitial = {
  _id: string;
  title: string;
  slug: string;
  location: string;
  salary: string;
  jobType: string;
  closingDate: string;
  description: string;
  imageUrl: string;
  published: boolean;
};

type Props = { mode: 'create' } | { mode: 'edit'; job: JobFormInitial };

export default function JobPostForm(props: Props) {
  const router = useRouter();
  const isEdit = props.mode === 'edit';
  const initial = isEdit
    ? props.job
    : {
        title: '',
        slug: '',
        location: '',
        salary: '',
        jobType: '',
        closingDate: '',
        description: '',
        imageUrl: '',
        published: true,
      };

  const [form, setForm] = useState({
    title: initial.title,
    slug: initial.slug,
    location: initial.location,
    salary: initial.salary,
    jobType: initial.jobType,
    closingDate: isEdit ? closingInputValue(initial.closingDate) : initial.closingDate,
    description: initial.description,
    imageUrl: initial.imageUrl ?? '',
    published: initial.published,
  });
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug.trim() || undefined,
      location: form.location,
      salary: form.salary,
      jobType: form.jobType,
      closingDate: form.closingDate,
      description: form.description,
      imageUrl: form.imageUrl.trim() || undefined,
      published: form.published,
    };
    try {
      if (isEdit) {
        const res = await fetch(`/api/admin/jobs/${props.job._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setMsg((err as { error?: string }).error || 'Update failed');
          return;
        }
        router.push('/admin/dashboard/careers');
        router.refresh();
      } else {
        const res = await fetch('/api/admin/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setMsg((err as { error?: string }).error || 'Create failed');
          return;
        }
        router.push('/admin/dashboard/careers');
        router.refresh();
      }
    } catch {
      setMsg('Network error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/dashboard/careers"
        className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
      >
        ← Back to careers list
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        {isEdit ? 'Edit job' : 'New job'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        {msg ? <p className="text-sm text-rose-600 dark:text-rose-400">{msg}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Slug (optional)</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Location</label>
            <input
              required
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Salary</label>
            <input
              required
              value={form.salary}
              onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Job type</label>
            <input
              required
              value={form.jobType}
              onChange={(e) => setForm((f) => ({ ...f, jobType: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Closing date</label>
            <input
              type="date"
              required
              value={form.closingDate}
              onChange={(e) => setForm((f) => ({ ...f, closingDate: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Listing image URL</label>
          <input
            type="url"
            placeholder="https://…"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
          />
          {form.imageUrl ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.imageUrl} alt="" className="max-h-48 w-full object-cover" />
            </div>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Description</label>
          <textarea
            required
            rows={8}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Published (visible on /careers)
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create job'}
          </button>
          <Link
            href="/admin/dashboard/careers"
            className="inline-flex items-center rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-800 dark:border-slate-600 dark:text-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
