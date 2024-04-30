import React from "react";

const MenuView = (props) => {
  const menuState = () => {
    switch (props.menuState) {
      case "base":
        if(props.isloggedin){
          return(
            <div className="fixed top-0 right-0 h-screen w-72 bg-cerulean">
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
            <div className="fixed top-0 right-0 h-screen w-72 bg-cerulean">
              <div className="flex justify-center mt-6">
                <button className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14">
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
        break;
    }
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-72 bg-cerulean">
      {menuState()}
    </div>
  );
};

export default MenuView;
