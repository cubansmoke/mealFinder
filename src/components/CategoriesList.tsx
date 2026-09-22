import { Link } from "react-router-dom";
import { useGetDataQuery } from "../services/mealApi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

function CategoriesList() {
  const { data, isLoading, isError } = useGetDataQuery("categories.php");

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="grid grid-cols-1 pt-5 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
}

export default CategoriesList;
