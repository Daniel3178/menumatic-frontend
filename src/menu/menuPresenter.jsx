import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoggedIn, getUserId, getUsername, getUserEmail,deleteUserAsync, signUpAsync} from "../signUp_page/userAccountSlice"
import MenuView from './menuView';

import { getMenuStateBase,
  getMenuStateLogin,
  getMenuStateSignup,
  getMenuStateSettings,
  getMenuStateFilter,
  getMenuStatePassChange,
  getMenuStateRecommendBtn, 
  getMenuStateRecommendDialog} from "./menuSlice";

import { 
  setStateBase,
  setStateLogin,
  setStateSignup,
  setStateSettings,
  setStateFilter,
  setStatePassChange,
  setStateRecommendBtn } from "./menuSlice";

import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";

import { signInWithEmailAndPassword, signOut,sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../config/firebaseConfig';

import { getExcludeTags, getIncludeTags, getMealsInPlan, saveTags } from "./filterPageSlice";
import { saveIncludeTags, saveExcludeTags } from "./filterPageSlice";
import {deleteUser} from "../store/menumaticServerAPISlice"
import{flushSpoonacularResults} from "../store/spoonacularAPISlice"


const MenuPresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const navigateToPlanList = () => {
    navigate("/plan_list");
  };

  const navigateToRecommendation = () => {
    dispatch(sortLikedDishes(mealsInPlan))
    navigate("/recommendation");
  };

  const isLoggedIn = useSelector(getIsLoggedIn)
  
  const stateBase = useSelector(getMenuStateBase)
  const stateLogin = useSelector(getMenuStateLogin)
  const stateSignup = useSelector(getMenuStateSignup)
  const stateSettings = useSelector(getMenuStateSettings)
  const stateFilter = useSelector(getMenuStateFilter)
  const statePassChange = useSelector(getMenuStatePassChange)
  const stateRecommendBtn = useSelector(getMenuStateRecommendBtn)
  const stateRecommendDialog = useSelector(getMenuStateRecommendDialog)


  const showMenu = () => {
    dispatch(setStateBase(true))
  }
  const showLogin = () => {
    dispatch(setStateLogin(true))
  };
  const showSignup = () => {
    dispatch(setStateSignup(true))
  };
  const showSettings = () => {
    dispatch(setStateSettings(true))
  };
  const showFilter = () => {
    dispatch(setStateFilter(true))
  };
  const showPassChange = () => {
    dispatch(setStatePassChange(true))
  };
  const showRecommendBtn = () => {
    dispatch(setStateRecommendBtn(true))
  };
  const showRecommendDialog = () => {
    dispatch(setStateRecommendBtn(true))
  };

  
  const hideMenu = () => {
    dispatch(setStateBase(false))
  }
  const hideLogin = () => {
    dispatch(setStateLogin(false))
  };
  const hideSignup = () => {
    dispatch(setStateSignup(false))
  };
  const hideSettings = () => {
    dispatch(setStateSettings(false))
  };
  const hideFilter = () => {
    dispatch(setStateFilter(false))
  };
  const hidePassChange = () => {
    dispatch(setStatePassChange(false))
  };
  const hideRecommendBtn = () => {
    dispatch(setStateRecommendBtn(false))
  };
  const hideRecommendDialog = () => {
    dispatch(setStateRecommendBtn(false))
  };

//**************LOG IN STUFF**************
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSignOutACB = () => {
      signOut(auth)
      
      .catch((err) => {
        // //console.log(err);
      });

  }
  const handleSignInACB = async (credentials) => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          setEmail("");
          setPassword("");
        } catch (error) {
          // //console.log(error);
          alert("Incorrect username or password");
        }
    };

  const handleDeleteAccount = (props) =>{
    // console.log("delete account")
    // console.log("DELETING USER FROM SERVER PROPS: ", props)
    // console.log("DELETING USER FROM SERVER uid: ", auth.currentUser.uid)
    dispatch(deleteUser({userId: auth.currentUser.uid}))
    dispatch(deleteUserAsync({email: props.email, password: props.password}))

  }

  const handlePasswordReset = async (props)=>  {
sendPasswordResetEmail(auth, props.email)
  .then(() => {
    // Password reset email sent!
    alert("Password reset email sent to THEN: ", props.email)
    // ..
  })
  .catch((error) => {
    // console.log("Password reset email sent to CATCH: ", error.message)
    // console.log("Password reset email sent to CATCH: ", error.code)
    // alert("Password reset email sent to CATCH: ", error.code)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }


//*************SIGN UP STUFF*************

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpAsync({ email, password }));
    setEmail("");
    setPassword("");
  }

//************FILTER STUFF************

const mealsInPlan = useSelector(getMealsInPlan)

const storedExcludeTags = useSelector(getExcludeTags)
const storedIncludeTags = useSelector(getIncludeTags)



  const handleApplyFilter = (includeTags, excludeTags, mealsInPlan) => {
    // dispatch(saveIncludeTags(includeTags))
    // dispatch(saveExcludeTags(excludeTags))
    //console.log("MEALSINPLAN: ", mealsInPlan)
    dispatch(saveTags({includeTags: includeTags, excludeTags: excludeTags, mealsInPlan: mealsInPlan}))
    navigate("/")
  }

  const handleCancel = () => {
  }


  return (
    <MenuView
      navigateToPlanList={navigateToPlanList}
      navigateToRecommendation={navigateToRecommendation}
      isLoggedIn={isLoggedIn}

      stateBase={stateBase}
      stateLogin={stateLogin}
      stateSignup={stateSignup}
      stateSettings={stateSettings}
      stateFilter={stateFilter}
      statePassChange={statePassChange}
      stateRecommendBtn={stateRecommendBtn}
      stateRecommendDialog={stateRecommendDialog}

      showMenu={showMenu}
      showLogin={showLogin}
      showSignup={showSignup}
      showSettings={showSettings}
      showFilter={showFilter}
      showPassChange={showPassChange}
      showRecommendBtn={showRecommendBtn}
      showRecommendDialog={showRecommendDialog}

      hideMenu={hideMenu}
      hideLogin={hideLogin}
      hideSignup={hideSignup}
      hideSettings={hideSettings}
      hideFilter={hideFilter}
      hidePassChange={hidePassChange}
      hideRecommendBtn={hideRecommendBtn}
      hideRecommendDialog={hideRecommendDialog}

      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      signIn ={handleSignInACB}
      signOut ={handleSignOutACB}
      deleteAccount={handleDeleteAccount}
      resetPassword={handlePasswordReset}

      signUp={handleSignUp}

      applyFilter={handleApplyFilter} cancel={handleCancel} 
      storedExcludeTags={storedExcludeTags}
      storedIncludeTags={storedIncludeTags}
      mealsInPlan={mealsInPlan}
    />
    );
}

export default MenuPresenter