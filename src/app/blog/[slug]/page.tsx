import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getPostBySlug, listPostSlugParams } from '@/lib/db/posts';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listPostSlugParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPostBySlug>> = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }
  if (!post) {
    return { title: `Post not found | ${siteConfig.shortName}` };
  }
  return {
    title: `${post.title} | ${siteConfig.shortName}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPostBySlug>> = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link
          href="/blog"
          className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline mb-8 inline-block"
        >
          ← Back to blog
        </Link>
        <header className="mb-8">
          {post.imageUrl ? (
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageUrl} alt="" className="max-h-[min(70vh,28rem)] w-full object-cover" />
            </div>
          ) : null}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-sm text-slate-500 dark:text-slate-400" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        </header>
        <div className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">{post.content}</div>
      </div>
    </article>
  );
}
