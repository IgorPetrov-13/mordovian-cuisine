'use client';
import { useAuthStore } from '@/store/auth.store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

function AppLoader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const { setAuthState } = useAuthStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  return <>{children}</>;
}

export default AppLoader;
