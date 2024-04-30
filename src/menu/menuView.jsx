import React from "react";
import {backGreen,} from "../assets"

const MenuView = (props) => {

  const loginMenu = () => {
    if(props.stateLogin == true){
      return(
        <div className="relative z-1 top-0 right-0 h-screen w-72 bg-cerulean">
          <button onClick={props.hideLogin} className="justify-start ml-6 mt-6">
            <img src={backGreen} />
          </button>
          <div className="place-content-center mt-40">
            <div className="flex text-whiteSmoke text-xxl font-outfit ml-10">
              LOGGA IN DÅ
            </div>
          </div>
          

        </div>
      );
    }
  }

  const menuState = () => {
    console.log(props)
    if(props.stateBase == true)
      if(props.isloggedin == true){
        return(
          <div className="absolute top-0 right-0 h-screen w-72 bg-cerulean">
          {loginMenu()}
            <div className="flex justify-center mt-6">
              <button className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14">
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
                <button onClick={props.navigateToPlanList} className="mt-10 hover:underline">
                  Saved meal plans
                </button>
              </div>
              <div>
                <button className="mt-10 hover:underline ">
                  Filters
                </button>
              </div>
              <div>
                <button className="mt-10 hover:underline">
                  Account settings
                </button>
              </div>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="static top-0 right-0 h-screen w-72 bg-cerulean">
            {loginMenu()}
            <div className="flex justify-center mt-6">
              <button onClick={props.showLogin} className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14">
                <div className="place-content-center text-gunmetal text-lg font-outfit">
                  LOG IN
                </div>
              </button>
            </div>
            <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
              <div>
                <button className="mt-10 hover:underline ">
                  Filters
                </button>
              </div>
            </div>
          </div>
        )
      }
  };

  return (
    <div className="fixed top-0 right-0 bg-cerulean">
      {menuState()}
    </div>
  );
};

export default MenuView;
