import { React, useEffect, useState } from "react";
import {
  backGreen,
  backBlue,
  backBlack,
  close,
  done,
  menubtn,
} from "../assets";
import { Transition, Dialog } from "@headlessui/react";

const MenuView = (props) => {
  //********LOGIN FUNCTION*********
  const handleSignInCB = (e) => {
    e.preventDefault();
    props.signIn({ email: props.email, password: props.password });
  };

  //********SIGNUP FUNCTION***********

  function validate_password() {
    let pass = document.getElementById("pass").value;
    let confirm_pass = document.getElementById("confirm_pass").value;
    if (pass != confirm_pass) {
      document.getElementById("wrong_pass_alert").style.color = "red";
      document.getElementById("wrong_pass_alert").innerHTML =
        "Passwords do not match.";
      document.getElementById("signup").disabled = true;
      document.getElementById("confirm_pass");
    } else {
      document.getElementById("wrong_pass_alert").style.color = "green";
      document.getElementById("wrong_pass_alert").innerHTML =
        "Passwords match.";
      document.getElementById("confirm_pass");
      document.getElementById("signup").disabled = false;
    }
  }

  //*******FILTER FUNCTIONS*******

  const includeTags = ["Pescetarian", "Vegetarian", "Vegan", "Primal"]; // Array of tags that can be include
  const excludeTags = [
    "Gluten",
    "Egg",
    "Dairy",
    "Shellfish",
    "Peanut",
    "Tree Nut",
  ]; // Array of tags that can be exclude

  const [includedItems, setIncludedItems] = useState(props.storedIncludeTags); // State hook for included items
  const [excludedItems, setExcludedItems] = useState(props.storedExcludeTags); // State hook for excluded items

  useEffect(() => {
    setIncludedItems(props.storedIncludeTags);
    setExcludedItems(props.storedExcludeTags);
  }, [props.storedIncludeTags, props.storedExcludeTags]);

  // Function to handle inclusion of tags
  function includeCheckboxHandler(event) {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setIncludedItems([...includedItems, value]); // If checked, add to included items
    } else {
      setIncludedItems((prevData) => {
        // If unchecked, remove from included items
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  function excludeCheckboxHandler(event) {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setExcludedItems([...excludedItems, value]); // If checked, add to excluded items
    } else {
      setExcludedItems((prevData) => {
        // If unchecked, remove from excluded items
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  const [mealsInPlanSliderValue, setMealsInPlanSliderValue] = useState(
    props.mealsInPlan
  );
  useEffect(() => {
    setMealsInPlanSliderValue(props.mealsInPlan);
  }, [props.mealsInPlan]);

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    setMealsInPlanSliderValue(newValue);
  };

  const applyFilterButton = () => {
    props.hideFilter();
    props.applyFilter(includedItems, excludedItems, mealsInPlanSliderValue);
  };

  const HandleDeleteAccount = (hProp) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="mr-6 ml-6 mt-10">
        <form
          className="w-full mt-10 flex justify-center items-center flex-col text-whiteSmoke text-lg font-outfit"
          onSubmit={(e) => {
            e.preventDefault();
            hProp.handleDeleteAccount({ email: email, password: password });
          }}
        >
          <input
            className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
            type="email"
            id="email"
            name="email"
            autocomplete="off"
            placeholder="e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></input>
          <input
            className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            name="password"
            placeholder="password"
            autocomplete="new-password"
            required
          ></input>
          <button
            className="tracking-wider mt-6 mr-2 text-whiteSmoke text-lg font-outfit rounded-full bg-red-500 text-bold hover:shadow-mid foucs:shadow-in w-56 h-14"
            type="submit"
            onClick={props.deleteAccount}
          >
            DELETE
          </button>
        </form>
      </div>
    );
  };

  const [deleteAccountToggle, setDeleteAccountToggle] = useState(false);
  //***********MENU VIEWS***********

  const renderMenu = () => {
    if (props.stateBase) {
      return <div className="absolute fixed top-0 right-0">{menuState()}</div>;
    }
  };

  const menuPing = () => {
    if (props.stateRecommendBtn) {
      return (
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellowGreen opacity-75"></span>
          <span class="inline-flex rounded-full h-3 w-3 bg-yellowGreen"></span>
        </span>
      );
    }
  };

  const settingsMenu = () => {
    return (
      <Transition
        show={props.stateSettings}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-yellowGreen font-outfit text-cerulean">
          {renderForgotPass()}
          <button
            onClick={props.hideSettings}
            className="justify-start ml-4 mt-4"
          >
            <img src={backBlue} />
          </button>
          <div className="flex justify-center flex-col items-center place-content-center mt-10">
            <button
              onClick={props.showPassChange}
              className="tracking-wider mr-2 rounded-full bg-cerulean text-whiteSmoke text-lg font-outfit text-bold hover:shadow-mid foucs:shadow-in w-60 h-14"
            >
              RESET PASSWORD
            </button>
          </div>
          <div className="flex justify-center flex-col items-center place-content-center mt-10">
            <button
              onClick={() => setDeleteAccountToggle(!deleteAccountToggle)}
              className="tracking-wider mr-2 w-60 h-14 text-whiteSmoke text-lg font-outfit rounded-full bg-red-500 text-bold hover:shadow-mid foucs:shadow-in"
            >
              DELETE ACCOUNT 
    
            </button>
            {deleteAccountToggle && (
              <HandleDeleteAccount handleDeleteAccount={props.deleteAccount} />
            )}
          </div>
        </div>
      </Transition>
    );
  };

  const filterMenu = () => {
    if (props.stateFilter) {
      return (
        <Transition
          show={props.stateFilter}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="relative z-1  top-0 right-0 h-screen w-72 bg-yellowGreen">
            <div className=" h-[80%] overflow-y-scroll tracking-wider text-cerulean">
              <button
                onClick={props.hideFilter}
                className="justify-start ml-6 mt-6"
              >
                <img src={backBlue} />
              </button>
              <h1 className="font-outfit font-bold text-lg ml-6 mt-6">
                FOOD PREFERENCE
              </h1>{" "}
              {/* Heading for food preference */}
              <ul>
                {" "}
                {/* List of included tag switches */}
                {includeTags.map(
                  (
                    ingredient,
                    index // Mapping through includeTags array
                  ) => (
                    <li key={index}>
                      {" "}
                      {/* Each tag */}
                      <div className="inline-block w-32 mr-4 ml-6 mt-2">
                        {" "}
                        {/* Tag container */}
                        <div className="flex font-outfit text-base justify-start">
                          {ingredient}
                        </div>{" "}
                        {/* Tag name */}
                      </div>
                      <div className="inline-block mr-4">
                        {" "}
                        {/* Checkbox container */}
                        <div className="flex items-end justify-end">
                          {" "}
                          {/* Checkbox position */}
                          <label className="relative inline-flex cursor-pointer">
                            {" "}
                            {/* Checkbox label */}
                            <input
                              type="checkbox"
                              value={ingredient}
                              checked={includedItems.includes(ingredient)}
                              onChange={(event) =>
                                includeCheckboxHandler(event)
                              } // On change event for inclusion
                              className="peer sr-only"
                            />
                            <div className="peer h-4 w-11 rounded-full border bg-whiteSmoke after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cerulean peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>{" "}
                            {/* Styling for checkbox */}
                          </label>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <h1 className="font-outfit font-bold text-lg ml-6 mt-6">
                ALLERGIES
              </h1>{" "}
              {/* Heading for allergies */}
              <ul>
                {" "}
                {/* List of exclude tag switches */}
                {excludeTags.map(
                  (
                    ingredient,
                    index // Mapping through excludeTags array
                  ) => (
                    <li key={index}>
                      {" "}
                      {/* Each tag */}
                      <div className="inline-block w-32 mr-4 ml-6 mt-2">
                        {" "}
                        {/* Tag container */}
                        <div className="flex font-outfit justify-start">
                          {ingredient}
                        </div>{" "}
                        {/* Tag name */}
                      </div>
                      <div className="inline-block mr-4">
                        {" "}
                        {/* Checkbox container */}
                        <div className="flex items-end justify-end">
                          {" "}
                          {/* Checkbox position */}
                          <label className="relative inline-flex cursor-pointer">
                            {" "}
                            {/* Checkbox label */}
                            <input
                              type="checkbox"
                              value={ingredient}
                              checked={excludedItems.includes(ingredient)}
                              onChange={(event) =>
                                excludeCheckboxHandler(event)
                              } // On change event for exclusion
                              className="peer sr-only"
                            />
                            <div className="peer h-4 w-11 rounded-full border bg-whiteSmoke after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cerulean peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>{" "}
                            {/* Styling for checkbox */}
                          </label>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <h1 className="font-outfit font-bold text-lg ml-6 mt-6">
                DISHES IN MEAL PLAN
              </h1>{" "}
              <div className="flex-col justify-center items-center ">
                <label
                  htmlFor="myRange"
                  className="block ml-6 mb-2 text-sm font-outfit self-center ml-5"
                >
                  {mealsInPlanSliderValue}
                </label>
                <input
                  value={mealsInPlanSliderValue}
                  onChange={handleSliderChange}
                  type="range"
                  min="1"
                  max="7"
                  className="ml-5 w-4/5 h-1 cursor-pointer bg-whiteSmoke border-none shadow-none accent-cerulean thumb-cerulean"
                  id="myRange"
                />
              </div>
            </div>
            <div className="flex justify-center h-[15%] bottom-0 justify-center pb-8">
              <div className="justify-center font-outfit text-whiteSmoke pb-2">
                {/* Button to apply filters */}
                <button
                  onClick={applyFilterButton}
                  className="mt-4 mb-16 p-1 w-40 h-12 rounded-[100px] bg-cerulean hover:shadow-mid"
                  id="signup"
                  type="submit"
                >
                  <div className="tracking-wider">APPLY</div>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      );
    }
  };

  const signupMenu = () => {
    return (
      <Transition
        show={props.stateSignup}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-yellowGreen">
          <button
            onClick={props.hideSignup}
            className="justify-start ml-6 mt-6"
          >
            <img src={backBlue} />
          </button>
          <div className="place-content-center mt-10">
            <form
              className="w-full mt-10 flex justify-center items-center flex-col text-whiteSmoke text-lg font-outfit"
              onSubmit={props.signUp}
            >
              <input
                className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
                type="email"
                placeholder="e-mail"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                required
              />

              <input
                className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
                onKeyUp={validate_password}
                id="pass"
                type="password"
                placeholder="password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                required
                minLength="6"
              />

              <input
                className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
                onKeyUp={validate_password}
                id="confirm_pass"
                type="password"
                placeholder="confirm password"
                required
                minLength="6"
              />

              <span id="wrong_pass_alert"></span>

              <button
                onClick={props.signUp}
                className="mt-4 mb-16 p-1 w-40 h-12 rounded-[100px] bg-cerulean hover:shadow-mid text-whiteSmoke disabled:opacity-50 disabled:cursor-not-allowed"
                id="signup"
                type="submit"
                disabled
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </Transition>
    );
  };

  const renderForgotPass = () => {
    //const [email, setEmail] = useState("");
    return (
      <Transition
        show={props.statePassChange}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative z-2 top-0 right-0 h-screen w-72 bg-yellowGreen">
          <button
            onClick={props.hidePassChange}
            className="justify-start ml-6 mt-6"
          >
            <img src={backBlue} />
          </button>
          <div className="place-content-center mt-40">
            <form
              className="w-full mt-10 flex justify-center items-center flex-col text-whiteSmoke text-lg font-outfit"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="m-2 p-2 w-56 h-12 bg-yellowGreen border-b-[2px] border-cerulean placeholder-whiteSmoke outline-none"
                type="email"
                placeholder="e-mail"
                id="email"
                name="email"
                value={props.email}
                onChange={(e) => {
                  e.preventDefault();
                  props.setEmail(e.target.value);
                }}
                required
              ></input>
              <button
                onClick={() => {
                  props.resetPassword({ email: props.email });
                }}
                className="mt-4 mb-16 p-1 w-56 h-14 rounded-[100px] bg-cerulean hover:shadow-mid text-whiteSmoke disabled:opacity-50 disabled:cursor-not-allowed"
                id="signup"
                type="submit"
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      </Transition>
    );
  };

  const [forgotPassToggle, setForgotPassToggle] = useState(false);

  const loginMenu = () => {
    return (
      <Transition
        show={props.stateLogin}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-cerulean animate-slide-in">
          {signupMenu()}
          {renderForgotPass()}
          <button onClick={props.hideLogin} className="justify-start ml-6 mt-6">
            <img src={backGreen} />
          </button>
          <div className="place-content-center mt-10">
            <div className="flex justify-center">
              <form
                className="w-full mt-10 flex justify-center items-center flex-col text-whiteSmoke text-lg font-outfit"
                onSubmit={handleSignInCB}
              >
                <input
                  className="m-2 p-2 w-56 h-12 bg-cerulean border-b-[2px] border-yellowGreen placeholder-whiteSmoke outline-none"
                  type="email"
                  placeholder="e-mail"
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                  required
                />
                <input
                  className="m-2 p-2 w-56 h-12 bg-cerulean border-b-[2px] border-yellowGreen text-whiteSmoke placeholder-whiteSmoke outline-none"
                  id="pass"
                  type="password"
                  placeholder="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <span id="wrong_pass_alert"></span>
                <button
                  className="mt-4 mb-10 p-1 w-40 h-12 rounded-[100px] bg-yellowGreen hover:shadow-mid text-whiteSmoke disabled:opacity-50 disabled:cursor-not-allowed"
                  id="signup"
                  type="submit"
                >
                  LOG IN
                </button>
                Forgot password?
                <button
                  onClick={props.showPassChange}
                  className="mt-4 mb-10 p-1 w-56 h-14 rounded-[100px] bg-yellowGreen hover:shadow-mid text-whiteSmoke disabled:opacity-50 disabled:cursor-not-allowed"
                  id="signup"
                  type="submit"
                >
                  RESET PASSWORD
                </button>
                Don't have an account?
                <button
                  onClick={props.showSignup}
                  className="mt-4 p-1 w-40 h-12 rounded-[100px] bg-whiteSmoke hover:shadow-mid text-gunmetal disabled:opacity-50 disabled:cursor-not-allowed"
                  id="signup"
                  type="submit"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    );
  };

  const menuState = () => {
    if (props.isLoggedIn) {
      return (
        <div className="absolute top-0 right-0 h-screen w-72 bg-cerulean">
          {settingsMenu()}
          {filterMenu()}

          <div className="lg:hidden flex flex-row">
            <div className="flex justify-start ml-6 mr-5">
              <button onClick={props.hideMenu}>
                <img src={backGreen} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={props.signOut}
                className="mt-4 mb-4 p-1 w-40 h-12 rounded-[100px] bg-whiteSmoke hover:shadow-mid text-gunmetal text-lg font-outfit"
              >
                LOG OUT
              </button>
            </div>
          </div>
          <div className="hidden lg:block justify-center ml-16">
            <button
              onClick={props.signOut}
              className="mt-4 mb-4 p-1 w-40 h-12 rounded-[100px] bg-whiteSmoke hover:shadow-mid text-gunmetal text-lg font-outfit"
            >
              LOG OUT
            </button>
          </div>
          <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
            <div>
              <button
                onClick={props.navigateToPlan}
                className="mt-10 hover:underline "
              >
                Latest meal plan
              </button>
            </div>
            <div>
              <button
                onClick={props.navigateToPlanList}
                className="mt-10 hover:underline"
              >
                Saved meal plans
              </button>
            </div>
            <div>
              <button
                onClick={props.showFilter}
                className="mt-10 hover:underline "
              >
                Filters
              </button>
            </div>
            <div>
              <button
                className="mt-10 hover:underline"
                onClick={props.showSettings}
              >
                Account settings
              </button>
            </div>
          </div>
          <div className="flex mt-10 ml-4 w-64 font-outfit text-whiteSmoke text-semiBold">
            <Transition
              show={props.stateRecommendBtn}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex-col bg-gunmetal bg-opacity-50 border-2 border-yellowGreen rounded-[20px] h-30 w-full">
                <div className="flex-col text-center justify-center">
                  <div className=" text-base mb-2 mt-2 leading-4">
                    Your first {props.mealsInPlan} liked dishes are available!
                  </div>
                  <div className="leading-4 text-[13px] ml-2 mr-2 mb-2">
                    You can also keep swiping for a more varied recommendation.
                  </div>
                </div>
                <div className="flex justify-center mb-2">
                  <button
                    className="h-14 w-44 rounded-[20px] bg-whiteSmoke hover:bg-gradient-to-tr hover:from-gold hover:to-white tracking-wider hover:text-gunmetal hover:shadow-mid text-gunmetal text-sm"
                    onClick={props.navigateToRecommendation}
                  >
                    VIEW RECOMMENDATION
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      );
    } else if (props.isLoggedIn == false) {
      return (
        <div className="absolute top-0 right-0 h-screen w-72 bg-cerulean">
          {filterMenu()}
          {loginMenu()}
          <div className="lg:hidden flex flex-row">
            <div className="flex justify-start ml-6 mr-5">
              <button onClick={props.hideMenu}>
                <img src={backGreen} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={props.showLogin}
                className="mt-4 mb-4 p-1 w-40 h-12 rounded-[100px] bg-whiteSmoke hover:shadow-mid text-gunmetal text-lg font-outfit"
              >
                LOG IN
              </button>
            </div>
          </div>
          <div className="hidden lg:block justify-center ml-16">
            <button
              onClick={props.showLogin}
              className="mt-4 mb-4 p-1 w-40 h-12 rounded-[100px] bg-whiteSmoke hover:shadow-mid text-gunmetal text-lg font-outfit"
            >
              LOG IN
            </button>
          </div>
          <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
            <div>
              <button
                onClick={props.showFilter}
                className="mt-10 hover:underline "
              >
                Filters
              </button>
            </div>
          </div>
          <div className="flex mt-10 ml-4 w-64 font-outfit text-whiteSmoke text-semiBold">
            <Transition
              show={props.stateRecommendBtn}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex-col bg-gunmetal bg-opacity-50 border-2 border-yellowGreen rounded-[20px] h-30 w-full">
                <div className="flex-col text-center justify-center">
                  <div className=" text-base mb-2 mt-2 leading-4">
                    Your {props.mealsInPlan} liked dishes are available!
                  </div>
                  <div className="leading-4 text-[13px] mb-2">
                    Or keep swiping for a more varied recommendation.
                  </div>
                </div>
                <div className="flex justify-center mb-2">
                  <button
                    className="h-14 w-44 rounded-[20px] bg-whiteSmoke hover:bg-gradient-to-tr hover:from-gold hover:to-white tracking-wider hover:text-gunmetal hover:shadow-mid text-gunmetal text-sm"
                    onClick={props.navigateToRecommendation}
                  >
                    VIEW RECOMMENDATION
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="lg:hidden fixed top-0 right-0 ">
        <button className="mt-12 mr-12" onClick={props.showMenu}>
          <div className="absolute top-10 right-11">{menuPing()}</div>
          <img src={menubtn} />
        </button>
        {renderMenu()}
      </div>
      <div className="hidden lg:block fixed top-0 right-0 bg-cerulean">
        {menuState()}
      </div>
    </div>
  );
};

export default MenuView;
