import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose';

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 200 },
    excerpt: { type: String, required: true, trim: true, maxlength: 500 },
    content: { type: String, required: true, maxlength: 200000 },
    imageUrl: { type: String, trim: true, maxlength: 2000, default: '' },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export type BlogPostDoc = InferSchemaType<typeof blogPostSchema> & { _id: mongoose.Types.ObjectId };

export const BlogPost: Model<BlogPostDoc> =
  mongoose.models.BlogPost ?? mongoose.model<BlogPostDoc>('BlogPost', blogPostSchema);
