import { React, useState } from "react";
import { backGreen, backBlue, backBlack, close, done } from "../assets";
import {Transition } from '@headlessui/react'
import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";

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

  // Function to handle inclusion of tags
  function includeCheckboxHandler(event) {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setIncludedItems([...includedItems, value]); // If checked, add to included items
      // console.log(value + " isChecked");
    } else {
      // console.log(value + " isUnChecked");
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
      // console.log(value + " isChecked");
    } else {
      // console.log(value + " isUnChecked");
      setExcludedItems((prevData) => {
        // If unchecked, remove from excluded items
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  const applyFilterButton = () => {
    props.hideFilter();
    props.applyFilter(includedItems, excludedItems);

  }


  //***********MENU VIEWS***********

  const settingsMenu = () => {
  
      return(
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
          <button
            onClick={props.hideSettings}
            className="justify-start ml-6 mt-6"
          >
            <img src={backBlue} />
          </button>
          <div className="flex place-content-center mt-10">
          <button
              className="tracking-wider mr-2 flex justify-center rounded-full bg-cerulean text-bold hover:shadow-mid foucs:shadow-in w-56 h-14"
            >
              <div className="place-content-center text-whiteSmoke text-lg font-outfit">
                CHANGE PASSWORD
              </div>
            </button>
          </div>
          <div className="flex place-content-center mt-10">
          <button
              className="tracking-wider mr-2 flex justify-center rounded-full bg-red-500 text-bold hover:shadow-mid foucs:shadow-in w-56 h-14"
            >
              <div className="place-content-center text-whiteSmoke text-lg font-outfit">
                DELETE ACCOUNT
              </div>
            </button>
          </div>
        </div>
        </Transition>
      )
  }

  const filterMenu = () => {
    
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
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-yellowGreen tracking-wider text-cerulean animate-slide-in">
          <button
            onClick={props.hideFilter}
            className="justify-start ml-6 mt-6"
          >
            <img src={backBlue} />
          </button>
          <h1 className="font-outfit font-bold text-lg ml-6 mt-6">FOOD PREFERENCE</h1>{" "}
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
                          onChange={(event) => includeCheckboxHandler(event)} // On change event for inclusion
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
          <h1 className="font-outfit font-bold text-lg ml-6 mt-6">ALLERGIES</h1>{" "}
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
                          onChange={(event) => excludeCheckboxHandler(event)} // On change event for exclusion
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
          <div className="flex justify-center mt-10 font-outfit text-whiteSmoke">
            {/* Button to apply filters */}
            <button
              onClick={applyFilterButton}
              className="mt-4 mb-16 p-1 w-40 h-12 rounded-[100px] bg-cerulean hover:shadow-mid"
              id="signup"
              type="submit"
            >
              <div className="tracking-wider">
              APPLY
              </div>
            </button>
          </div>
        </div>
        </Transition>
      );
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
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-yellowGreen animate-slide-in">
          <button
            onClick={props.hideSignup}
            className="justify-start ml-6 mt-6"
          >
            <img src={backBlue} />
          </button>
          <div className="place-content-center mt-40">
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
          <button onClick={props.hideLogin} className="justify-start ml-6 mt-6">
            <img src={backGreen} />
          </button>
          <div className="place-content-center mt-40">
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
                  className="mt-4 mb-16 p-1 w-40 h-12 rounded-[100px] bg-yellowGreen hover:shadow-mid text-whiteSmoke disabled:opacity-50 disabled:cursor-not-allowed"
                  id="signup"
                  type="submit"
                >
                  LOG IN
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
    console.log(props);
    if (props.isLoggedIn) {
      return (
        <div className="absolute top-0 right-0 h-screen w-72 bg-cerulean">
          {settingsMenu()}
          {filterMenu()}
          <div className="flex justify-center mt-6">
            <button
              onClick={props.signOut}
              className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14"
            >
              <div className="place-content-center text-gunmetal text-lg font-outfit">
                LOG OUT
              </div>
            </button>
          </div>
          <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
            <div>
              <button className="mt-10 hover:underline ">
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
        </div>
      );
    } else if (props.isLoggedIn == false) {
      return (
        <div className="static top-0 right-0 h-screen w-72 bg-cerulean">
          {filterMenu()}
          {loginMenu()}
          <div className="flex justify-center mt-6">
            <button
              onClick={props.showLogin}
              className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14"
            >
              <div className="place-content-center center  text-gunmetal text-lg font-outfit">
                LOG IN
              </div>
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
        </div>
      );
    }
  };

  return <div className="fixed top-0 right-0 bg-cerulean">{menuState()}</div>;
};

export default MenuView;
