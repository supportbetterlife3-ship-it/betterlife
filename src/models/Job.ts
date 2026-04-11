import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose';

const jobSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 200 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    salary: { type: String, required: true, trim: true, maxlength: 120 },
    jobType: { type: String, required: true, trim: true, maxlength: 120 },
    closingDate: { type: Date, required: true },
    description: { type: String, required: true, maxlength: 50000 },
    imageUrl: { type: String, trim: true, maxlength: 2000, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type JobDoc = InferSchemaType<typeof jobSchema> & { _id: mongoose.Types.ObjectId };

export const Job: Model<JobDoc> = mongoose.models.Job ?? mongoose.model<JobDoc>('Job', jobSchema);
