import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetDataQuery, useGetMealByNameQuery } from "../services/mealApi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function Categories() {
  const [searchText, setSearchText] = useState("");

  // Get categories
  const { data, isLoading, isError } = useGetDataQuery("categories.php");

  // Search meals while typing
  const { data: searchData, isLoading: isSearching } =
    useGetMealByNameQuery(searchText, {
      skip: searchText.trim() === "",
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="p-5">
      {/* Search */}
      <form className="flex items-center justify-center p-5">
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search meals..."
          className="h-8 rounded-full border border-black p-3"
        />

        <button
          type="submit"
          className="ml-5 rounded-full border border-black px-3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  bg-orange-500 p-1 text-lg hover:bg-red-500 hover:text-white"
        >
          Search
        </button>
      </form>

      {/* Search results */}
      {searchText.trim() ? (
        <>
          <h2 className="my-6 text-2xl font-bold">
            Search results for: {searchText}
          </h2>

          {isSearching && <p>Searching...</p>}

          {!isSearching && !searchData?.meals && (
            <p className="text-xl">No meals found.</p>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchData?.meals?.map((meal: Meal) => (
              <Link key={meal.idMeal} to={`/meal/${meal.strMeal}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{meal.strMeal}</CardTitle>
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
        </>
      ) : (
        /* Categories */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.categories?.map((category: Category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {category.strCategory}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="h-auto w-full object-cover"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
