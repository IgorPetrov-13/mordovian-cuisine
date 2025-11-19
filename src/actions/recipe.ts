import prisma from '@/utils/prisma';

export const getRecipes = async () => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipes };
  } catch (error) {
    console.error('Ошибка получения рецептов:', error);
    return { error: 'Ошибка получения рецептов:', success: false };
  }
};

export const createRecipes = async (formData: FormData) => {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(formData.get(`quantity_${key.split('_')[1]}`) as string),
      }));

    if (!name || !ingredients.length) {
      return { error: 'Название и ингредиенты обязательны', success: false };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipe };
  } catch (error) {
    console.error('Ошибка создания рецепта:', error);
    return { error: 'Ошибка создания рецепта:', success: false };
  }
};

export const updateRecipes = async (id: string, formData: FormData) => {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(formData.get(`quantity_${key.split('_')[1]}`) as string),
      }));

    if (!name || !ingredients.length) {
      return { error: 'Название и ингредиенты обязательны', success: false };
    }

    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipe };
  } catch (error) {
    console.error('Ошибка обновления рецепта:', error);
    return { error: 'Ошибка обновления рецепта:', success: false };
  }
};

export const deleteRecipes = async (id: string) => {
  try {
    if (!id) {
      return { error: 'Не указан id', success: false };
    }

    await prisma.recipeIngredient.deleteMany({
      where: {
        recipeId: id,
      },
    });

    await prisma.recipe.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка удаления рецепта:', error);
    return { error: 'Ошибка удаления рецепта:', success: false };
  }
};
