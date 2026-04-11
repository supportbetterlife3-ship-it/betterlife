import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSignIn from '@/components/admin/AdminSignIn';

export default async function AdminPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/admin/dashboard');
  }
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <AdminSignIn />
    </div>
  );
}
