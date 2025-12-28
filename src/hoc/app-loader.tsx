'use client';
import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import { useRecipeStore } from '@/store/recipe.store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

function AppLoader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const { isAuth, setAuthState } = useAuthStore();

  const { loadIngredients } = useIngredientStore();

  const { loadRecipes } = useRecipeStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return <>{children}</>;
}

export default AppLoader;
