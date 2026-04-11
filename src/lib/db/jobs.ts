import { dbConnect } from '@/lib/mongodb';
import { Job } from '@/models/Job';
import type { JobPosting } from '@/types';

function toPublicJob(doc: {
  _id: { toString: () => string };
  title: string;
  slug: string;
  location: string;
  salary: string;
  jobType: string;
  closingDate: Date;
  description: string;
  imageUrl?: string;
}): JobPosting {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    location: doc.location,
    salary: doc.salary,
    jobType: doc.jobType,
    closingDate: doc.closingDate.toISOString(),
    description: doc.description,
    ...(doc.imageUrl ? { imageUrl: doc.imageUrl } : {}),
  };
}

export async function listPublishedJobs(): Promise<JobPosting[]> {
  await dbConnect();
  const docs = await Job.find({ published: true }).sort({ createdAt: -1 }).lean();
  return docs.map((d) =>
    toPublicJob({
      _id: d._id,
      title: d.title,
      slug: d.slug,
      location: d.location,
      salary: d.salary,
      jobType: d.jobType,
      closingDate: d.closingDate,
      description: d.description,
      imageUrl: d.imageUrl || undefined,
    })
  );
}

export async function getJobBySlug(slug: string): Promise<JobPosting | null> {
  await dbConnect();
  const d = await Job.findOne({ slug, published: true }).lean();
  if (!d) return null;
  return toPublicJob({
    _id: d._id,
    title: d.title,
    slug: d.slug,
    location: d.location,
    salary: d.salary,
    jobType: d.jobType,
    closingDate: d.closingDate,
    description: d.description,
    imageUrl: d.imageUrl || undefined,
  });
}

export async function listJobSlugsForSitemap(): Promise<{ slug: string; updatedAt: Date }[]> {
  await dbConnect();
  const docs = await Job.find({ published: true }).select('slug updatedAt').lean();
  return docs.map((d) => ({
    slug: d.slug,
    updatedAt: d.updatedAt ? new Date(d.updatedAt) : new Date(),
  }));
}

export async function listJobSlugParams(): Promise<{ slug: string }[]> {
  try {
    const rows = await listJobSlugsForSitemap();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function listAllJobsAdmin() {
  await dbConnect();
  return Job.find({}).sort({ createdAt: -1 }).lean();
}

export async function getJobByIdAdmin(id: string) {
  await dbConnect();
  return Job.findById(id).lean();
}

export async function createJob(data: {
  title: string;
  slug: string;
  location: string;
  salary: string;
  jobType: string;
  closingDate: Date;
  description: string;
  imageUrl?: string;
  published?: boolean;
}) {
  await dbConnect();
  return Job.create(data);
}

export async function updateJobById(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    location: string;
    salary: string;
    jobType: string;
    closingDate: Date;
    description: string;
    imageUrl: string;
    published: boolean;
  }>
) {
  await dbConnect();
  return Job.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteJobById(id: string) {
  await dbConnect();
  return Job.findByIdAndDelete(id);
}
