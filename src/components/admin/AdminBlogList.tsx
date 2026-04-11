'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import { adminQueryKeys } from '@/lib/admin/queryKeys';

type PostRow = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  imageUrl?: string;
};

async function fetchPosts(): Promise<PostRow[]> {
  const res = await fetch('/api/admin/posts');
  if (!res.ok) throw new Error('Failed to load posts');
  return res.json();
}

export default function AdminBlogList() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: posts = [], isPending: loading } = useQuery({
    queryKey: adminQueryKeys.posts,
    queryFn: fetchPosts,
  });

  async function performDelete(id: string) {
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await queryClient.invalidateQueries({ queryKey: adminQueryKeys.posts });
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete post?"
        description="This removes the blog post from the site. You can’t undo this."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={async () => {
          if (deleteId) await performDelete(deleteId);
        }}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Blog</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage posts shown on the public blog.</p>
        </div>
        <Link
          href="/admin/dashboard/blog/new"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Write blog
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <p className="p-8 text-center text-slate-600 dark:text-slate-300">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300">No posts yet.</p>
            <Link href="/admin/dashboard/blog/new" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Write your first post
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {posts.map((p) => (
              <li key={p._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0 flex gap-4">
                  <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 sm:block">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{p.title}</p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">/{p.slug}</p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        p.published
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/dashboard/blog/${p._id}/edit`}
                    className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteId(p._id)}
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
