import React from "react";
import { backGreen } from "../assets";

const MenuView = (props) => {
  const handleSignInCB = (e) => {
    e.preventDefault();
    props.signIn({ email: props.email, password: props.password });
  };

  

  const loginMenu = () => {
    if (props.stateLogin == true) {
      return (
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-cerulean">
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
      );
    }
  };

  const menuState = () => {
    console.log(props);
      if (props.isLoggedIn) {
        return (
          <div className="absolute top-0 right-0 h-screen w-72 bg-cerulean">
            <div className="flex justify-center mt-6">
              <button onClick={props.signOut} className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14">
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
                <button className="mt-10 hover:underline ">Filters</button>
              </div>
              <div>
                <button className="mt-10 hover:underline">
                  Account settings
                </button>
              </div>
            </div>
          </div>
        );
      } else if(props.isLoggedIn == false){
        return (
          <div className="static top-0 right-0 h-screen w-72 bg-cerulean">
            {loginMenu()}
            <div className="flex justify-center mt-6">
              <button
                onClick={props.showLogin}
                className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14"
              >
                <div className="place-content-center text-gunmetal text-lg font-outfit">
                  LOG IN
                </div>
              </button>
            </div>
            <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
              <div>
                <button className="mt-10 hover:underline ">Filters</button>
              </div>
            </div>
          </div>
        );
      }
  };

  return <div className="fixed top-0 right-0 bg-cerulean">{menuState()}</div>;
};

export default MenuView;
