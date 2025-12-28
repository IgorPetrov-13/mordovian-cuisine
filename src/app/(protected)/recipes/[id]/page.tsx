'use client';

import RecipeForm from '@/forms/recipe.form';
import { useRecipeStore } from '@/store/recipe.store';
import { IRecipe } from '@/types/recipe';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const recipe = recipes.find((r) => r.id === id);
    setSelectedRecipe(recipe || null);
  }, [recipes, id]);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && !error && !selectedRecipe && <p>Рецепт не найден</p>}

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Редактировать рецепт: {selectedRecipe?.name}</h1>
        <RecipeForm initialRecipe={selectedRecipe} />
      </div>
    </>
  );
}
