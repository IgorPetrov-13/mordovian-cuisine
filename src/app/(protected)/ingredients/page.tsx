import IngredientTable from '@/components/ui/tables/ingredientTable';
import IngredientForm from '@/forms/ingredient.form';

function IngredientsPage() {
  return (
    <div>
      <IngredientForm />
      <IngredientTable />
    </div>
  );
}

export default IngredientsPage;
