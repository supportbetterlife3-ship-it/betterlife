import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { listJobSlugsForSitemap } from '@/lib/db/jobs';
import { listPostSlugsForSitemap } from '@/lib/db/posts';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteConfig.siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.siteUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.siteUrl}/careers`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteConfig.siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteConfig.siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.siteUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  let jobRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const jobs = await listJobSlugsForSitemap();
    jobRoutes = jobs.map((job) => ({
      url: `${siteConfig.siteUrl}/careers/${job.slug}`,
      lastModified: job.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  } catch {
    /* Mongo not configured at build */
  }
  try {
    const posts = await listPostSlugsForSitemap();
    blogRoutes = posts.map((post) => ({
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));
  } catch {
    /* Mongo not configured at build */
  }

  return [...staticRoutes, ...jobRoutes, ...blogRoutes];
}
