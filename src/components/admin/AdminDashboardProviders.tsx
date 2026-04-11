'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';

const STALE_MS = 5 * 60 * 1000;
const GC_MS = 30 * 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_MS,
        gcTime: GC_MS,
        refetchOnWindowFocus: false,
      },
    },
  });
}

type Props = {
  email: string;
  initialPendingMessages: number;
  children: React.ReactNode;
};

export default function AdminDashboardProviders({ email, initialPendingMessages, children }: Props) {
  const [client] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={client}>
      <AdminDashboardShell email={email} initialPendingMessages={initialPendingMessages}>
        {children}
      </AdminDashboardShell>
    </QueryClientProvider>
  );
}
