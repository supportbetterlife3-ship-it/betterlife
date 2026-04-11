import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { listPublishedPosts } from '@/lib/db/posts';

export const revalidate = 60;

export const metadata = {
  title: `Blog | ${siteConfig.shortName}`,
  description: `News and updates from ${siteConfig.brandName}.`,
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 ">
          <h1 className="text-4xl sm:text-5xl py-2 font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-sky-300 bg-clip-text text-transparent mb-4">
            Blog
          </h1>
        </header>

        <ul className="space-y-6">
          {posts.length === 0 ? (
            <li className="glass-card p-8 text-center text-slate-600 dark:text-slate-300">No posts yet. Check back soon.</li>
          ) : (
            posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden glass-card border border-slate-200/80 dark:border-slate-700 hover:border-brand-500/40 transition-colors rounded-xl"
                >
                  {post.imageUrl ? (
                    <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{post.title}</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
                    {post.publishedAt && (
                      <p className="mt-3 text-xs text-brand-600 dark:text-brand-400">
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
