export const normalizeIngrAmount = (meal, portions) => {
    const {id, imageType, title, analyzedInstructions,servings, extendedIngredients } =
      meal;
    const ingrArr = extendedIngredients.map((ingredient) => {
      const { measures: {metric: {amount, unitShort}}, name, nameClean } = ingredient;
      const calcAmount =
        amount > 0.1 ? amount * (portions / servings) : amount;
      return {
        nameClean: nameClean || name,
        measures: {
          metric: {
            amount: calcAmount,
            unitShort: unitShort,
          },
        },
      };
    });

    const result ={
      id: id,
      title: title,
      imageType: imageType,
      analyzedInstructions: analyzedInstructions,
      extendedIngredients: ingrArr,
    };
    
    return {
      portions: portions,
      result: result,
    };
  };