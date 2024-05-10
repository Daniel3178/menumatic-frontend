export const spoonacularComplexSearchBaseURL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
export const spoonacularRandomSearchBaseURL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&include-tags=dinner";
export const spoonacularBulkSearchBaseURL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4e9db78df8msh8414202f72976fap1cb9c3jsn17e6a5ffdd16",
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};
export { options };
