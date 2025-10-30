'use client';
import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

function AppLoader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const { isAuth, setAuthState } = useAuthStore();

  const { loadIngredients } = useIngredientStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  return <>{children}</>;
}

export default AppLoader;
