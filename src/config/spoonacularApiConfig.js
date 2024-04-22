const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=dinner&number=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4e9db78df8msh8414202f72976fap1cb9c3jsn17e6a5ffdd16',
    	'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

export { url, options}