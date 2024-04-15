const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c1cfce2a4msh5dc5caada7962ebp1ca537jsn3ce7207d48aa',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

export { url, options}