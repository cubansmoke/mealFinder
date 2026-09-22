import { useParams } from "react-router-dom";
import { useGetMealByNameQuery } from "../services/mealApi";
import CategoriesList from "./CategoriesList";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

function Meal() {
  const { foodName } = useParams<{ foodName: string }>();

  const { data, isLoading, isError } = useGetMealByNameQuery(foodName || "");

  if (isLoading) {
    return <div className="p-6 text-xl">Loading meal...</div>;
  }

  if (isError) {
    return <div className="p-6 text-xl text-red-500">Error loading meal.</div>;
  }

  const meal: Meal | undefined = data?.meals?.[0];

  if (!meal) {
    return <div className="p-6 text-xl">Meal not found.</div>;
  }

  // Extract ingredients safely
  const ingredients: { ingredient: string; measure: string }[] = [];
  Array.from({ length: 20 }).forEach((_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`];
    const measure = meal[`strMeasure${index + 1}`];

    if (ingredient?.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  });

  // Split steps cleanly by line breaks or numbered markers (e.g. "STEP 1", "1.")
  const instructions = meal.strInstructions
    .split(/\r?\n+|\r+/)
    .map((step) => step.replace(/^(STEP\s*\d+:?|\d+\.)\s*/i, "").trim())
    .filter(Boolean);

  return (
    <div className="w-full p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl py-5 font-bold">{meal.strMeal}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3">
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto md:h-96 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="col-span-2 md:px-5">
          <div className="pt-2">
            <span className="text-xl md:text-2xl font-bold">Category: </span>
            <span className="text-xl md:text-2xl">{meal.strCategory}</span>
          </div>

          <div>
            <span className="text-xl md:text-2xl font-bold">Area: </span>
            <span className="text-xl md:text-2xl">{meal.strArea}</span>
          </div>

          <h2 className="mt-6 mb-3 text-2xl md:text-3xl font-bold">
            Ingredients
          </h2>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 list-disc list-inside">
            {ingredients.map((item, index) => (
              <li key={index} className="text-lg md:text-xl">
                <span className="font-medium">{item.measure}</span> {item.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 w-full p-4">
        <h2 className="mb-6 text-3xl font-bold">Instructions</h2>

        <ol className="space-y-4">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex items-start gap-4 text-lg md:text-xl">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 font-bold text-slate-800 text-sm">
                {index + 1}
              </span>
              <p className="pt-0.5 leading-relaxed">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="w-full p-3 mt-10 border-t">
        <h2 className="text-3xl font-bold mb-4">See our other food categories</h2>
        <CategoriesList />
      </div>
    </div>
  );
}

export default Meal;
