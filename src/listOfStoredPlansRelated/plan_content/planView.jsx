import React from "react";
import { logo, backBlack } from "../../assets";

const PlanView = ({
  meal,
  recipes,
  goToShoplist,
  state,
  navigateBack,
  navigateToRecipe,
}) => {
  if (state === "ready") {
    return (
      <div className="pt-32 flex-col justify-center w-screen max-w-[1440px] font-outfit pr-8 lg:pr-80 pl-8">
        <button
          className="text-whiteSmoke hover:shadow-xl"
          onClick={() => navigateBack()}
          aria-label="go back"
        >
          <img src={backBlack} />
        </button>
        <h1 className="text-center text-xl font-regular pb-10 text-gunmetal">
          Recipes for {meal}
        </h1>
        <div>
          <div className="mb-4 font-outfit text-2xl font-medium w-full flex items-center justify-center">
            <span className="text-center w-[10%]">Day</span>
            <span className="text-center w-[60%]">Meal</span>
            <span className="text-center w-[30%]">Portions</span>
          </div>
        </div>

        {recipes.map((recipe, index) => (
          <div
            className="bg-cerulean mb-5 w-full h-[45px] rounded-small font-outfit text-whiteSmoke shadow-mid flex items-center justify-center"
            key={index}
            onClick={() => navigateToRecipe(index)}
          >
            <span className="text-center w-[10%]">{index + 1}</span>
            <span className="text-center truncate w-[60%]">{recipe.name}</span>
            <span className="text-center w-[30%]">{recipe.portions}</span>
          </div>
        ))}

        <div className="flex w-full justify-end">
          <button
            className="w-[180px] h-[54px] bg-cerulean rounded-[100px] font-outfit font-base font-medium text-whiteSmoke shadow-mid"
            onClick={goToShoplist}
            role="button"
          >
            SHOPPING LIST
          </button>
        </div>
      </div>
    );
  } else if (state === "loading") {
    return (
      // <div>
      //   <h1 className="text-center font-bold py-4">Recipes for {meal}</h1>
      //   <h1 className="text-center font-bold py-4">Loading...</h1>
      // </div>

      <div className="h-svh w-screen flex flex-col items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-gunmetal"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <span className="animate-pulse font-outfit font-medium text-lg text-gunmetal">
          Loading...
        </span>
      </div>
    );
  } else if (state === "failed") {
    return (
      <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
        <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
          Server is down.
        </h1>
        <p class="text-lg text-gunmetal">
          We're sorry for the inconvenience. Please try refreshing the page or
          check back later.
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center font-bold py-4">Something went wrong</h1>
      </div>
    );
  }
};

export default PlanView;
