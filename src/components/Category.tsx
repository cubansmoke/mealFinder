import { useParams, Link } from "react-router-dom";
import {
  useGetDataQuery,
  useGetMealsByCategoryQuery,
} from "../services/mealApi";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

function Category() {
  const { category } = useParams<{ category: string }>();

  // Get meals for this category
  const {
    data: mealsData,
    isLoading: mealsLoading,
    isError: mealsError,
  } = useGetMealsByCategoryQuery(category || "");

  // Get all categories so we can find the description
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetDataQuery("categories.php");

  if (mealsLoading || categoriesLoading) {
    return <div>Loading meals...</div>;
  }

  if (mealsError || categoriesError) {
    return <div>Error loading data.</div>;
  }

  // Find the current category
  const currentCategory = categoriesData?.categories?.find(
    (item: Category) =>
      item.strCategory.toLowerCase() === category?.toLowerCase(),
  );

  return (
    <div className="p-6">
      {/* Category title */}
      <h1 className="mb-4 text-3xl font-bold">
        {category} Meals
      </h1>
      {/* Category description */}
      {currentCategory && (
        <p className="mb-8 text-justify text-lg leading-7 text-gray-600">
          {currentCategory.strCategoryDescription}
        </p>
      )}

      {/* Meals */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mealsData?.meals?.map((meal: Meal) => (
          <Link
            key={meal.idMeal}
            to={`/meal/${meal.strMeal}`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  {meal.strMeal}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full rounded-lg object-cover"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
