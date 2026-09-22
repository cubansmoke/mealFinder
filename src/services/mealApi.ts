import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealApi = createApi({
  reducerPath: "mealApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),

  endpoints: (builder) => ({
    getData: builder.query({
      query: (endpoint: string) => endpoint,
    }),
    getMealsByCategory: builder.query<any, string>({
      query: (category) => `filter.php?c=${category}`,
    }),
    getMealByName: builder.query({
      query: (foodName) => `search.php?s=${foodName}`,
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetMealsByCategoryQuery,
  useGetMealByNameQuery,
} = mealApi;
