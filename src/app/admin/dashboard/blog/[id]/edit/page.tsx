import { notFound } from 'next/navigation';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { getBlogPostById } from '@/lib/db/posts';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const doc = await getBlogPostById(id);
  if (!doc) notFound();

  const post = {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    imageUrl: typeof doc.imageUrl === 'string' ? doc.imageUrl : '',
    published: Boolean(doc.published),
  };

  return <BlogPostForm mode="edit" post={post} />;
}
