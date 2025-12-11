import { IRecipe } from '@/types/recipe';
import { create } from 'zustand';

interface IActionResult {
  success: boolean;
  recipe?: IRecipe;
  error?: string;
}

interface IRecipeState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: string;
  loadRecipes: () => Promise<void>;
  addRecipe: (formData: FormData) => Promise<IActionResult>;
  updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
  removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<IRecipeState>((set) => ({}));
