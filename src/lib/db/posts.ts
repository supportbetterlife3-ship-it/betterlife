import { dbConnect } from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';

export type PublicBlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string | null;
  imageUrl?: string;
};

function toPublicPost(d: {
  _id: { toString: () => string };
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt?: Date | null;
  imageUrl?: string;
}): PublicBlogPost {
  return {
    _id: d._id.toString(),
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt,
    content: d.content,
    publishedAt: d.publishedAt ? d.publishedAt.toISOString() : null,
    ...(d.imageUrl ? { imageUrl: d.imageUrl } : {}),
  };
}

export async function listPublishedPosts(): Promise<PublicBlogPost[]> {
  await dbConnect();
  const docs = await BlogPost.find({ published: true })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return docs.map((d) =>
    toPublicPost({
      _id: d._id,
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt,
      content: d.content,
      publishedAt: d.publishedAt,
      imageUrl: d.imageUrl || undefined,
    })
  );
}

/** Recent posts for nav cards / public API (published only). */
export async function listRecentPublishedPosts(limit: number): Promise<PublicBlogPost[]> {
  const posts = await listPublishedPosts();
  return posts.slice(0, Math.max(1, Math.min(limit, 12)));
}

export async function getPostBySlug(slug: string): Promise<PublicBlogPost | null> {
  await dbConnect();
  const d = await BlogPost.findOne({ slug, published: true }).lean();
  if (!d) return null;
  return toPublicPost({
    _id: d._id,
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt,
    content: d.content,
    publishedAt: d.publishedAt,
    imageUrl: d.imageUrl || undefined,
  });
}

export async function listPostSlugsForSitemap(): Promise<{ slug: string; updatedAt: Date }[]> {
  await dbConnect();
  const docs = await BlogPost.find({ published: true }).select('slug updatedAt').lean();
  return docs.map((d) => ({
    slug: d.slug,
    updatedAt: d.updatedAt ? new Date(d.updatedAt) : new Date(),
  }));
}

export async function listPostSlugParams(): Promise<{ slug: string }[]> {
  try {
    const rows = await listPostSlugsForSitemap();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function listAllPostsAdmin() {
  await dbConnect();
  return BlogPost.find({}).sort({ createdAt: -1 }).lean();
}

export async function getBlogPostById(id: string) {
  await dbConnect();
  return BlogPost.findById(id).lean();
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published?: boolean;
  publishedAt?: Date | null;
}) {
  await dbConnect();
  return BlogPost.create(data);
}

export async function updatePostById(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    published: boolean;
    publishedAt: Date | null;
  }>
) {
  await dbConnect();
  return BlogPost.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deletePostById(id: string) {
  await dbConnect();
  return BlogPost.findByIdAndDelete(id);
}
