export type Service = {
  name: string;
  description: string;
};

export type ServiceIconColor =
  | 'rose'
  | 'red'
  | 'amber'
  | 'emerald'
  | 'blue'
  | 'violet'
  | 'teal'
  | 'indigo'
  | 'sky'
  | 'orange'
  | 'pink'
  | 'cyan'
  | 'fuchsia'
  | 'lime'
  | 'slate';

export type TeamMember = {
  id?: string;
  _id?: string;
  name: string;
  role: string;
  photo?: string;
  photoUrl?: string;
};

/** Public job shape (Mongo-backed careers). */
export type JobPosting = {
  _id: string;
  title: string;
  slug: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
  closingDate: string;
  imageUrl?: string;
};