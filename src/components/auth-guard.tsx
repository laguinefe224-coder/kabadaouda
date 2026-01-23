'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="space-y-4 w-full max-w-3xl p-10">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    );
  }

  return <>{children}</>;
}
