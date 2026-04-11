import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose';

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, maxlength: 320 },
    phone: { type: String, required: true, trim: true, maxlength: 50 },
    message: { type: String, required: true, trim: true, maxlength: 10000 },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ContactMessage: Model<ContactMessageDoc> =
  mongoose.models.ContactMessage ??
  mongoose.model<ContactMessageDoc>('ContactMessage', contactMessageSchema);
