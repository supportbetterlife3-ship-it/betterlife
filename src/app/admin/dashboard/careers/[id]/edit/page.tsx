import { notFound } from 'next/navigation';
import JobPostForm from '@/components/admin/JobPostForm';
import { getJobByIdAdmin } from '@/lib/db/jobs';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminCareersEditPage({ params }: Props) {
  const { id } = await params;
  const doc = await getJobByIdAdmin(id);
  if (!doc) notFound();

  const closing =
    doc.closingDate instanceof Date ? doc.closingDate.toISOString() : String(doc.closingDate);

  const job = {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    location: doc.location,
    salary: doc.salary,
    jobType: doc.jobType,
    closingDate: closing,
    description: doc.description,
    imageUrl: typeof doc.imageUrl === 'string' ? doc.imageUrl : '',
    published: Boolean(doc.published),
  };

  return <JobPostForm mode="edit" job={job} />;
}
