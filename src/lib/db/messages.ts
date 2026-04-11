import { dbConnect } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await dbConnect();
  return ContactMessage.create({ ...data, status: 'pending' as const });
}

export async function listMessagesAdmin() {
  await dbConnect();
  return ContactMessage.find({}).sort({ createdAt: -1 }).lean();
}

export async function countPendingMessages(): Promise<number> {
  await dbConnect();
  return ContactMessage.countDocuments({
    $or: [{ status: 'pending' }, { status: { $exists: false } }],
  });
}

export async function updateMessageStatus(id: string, status: 'pending' | 'resolved') {
  await dbConnect();
  return ContactMessage.findByIdAndUpdate(id, { status }, { new: true }).lean();
}

export async function deleteMessageById(id: string) {
  await dbConnect();
  return ContactMessage.findByIdAndDelete(id);
}
