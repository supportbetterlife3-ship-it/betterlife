import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import { countPendingMessages } from '@/lib/db/messages';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/admin');
  }

  let initialPending = 0;
  try {
    initialPending = await countPendingMessages();
  } catch {
    initialPending = 0;
  }

  return (
    <AdminDashboardShell email={session.user.email} initialPendingMessages={initialPending}>
      {children}
    </AdminDashboardShell>
  );
}
