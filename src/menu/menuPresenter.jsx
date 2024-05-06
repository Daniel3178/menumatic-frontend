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
  getMenuStatePassChange } from "./menuSlice";

import { setStateLogin,
  setStateSignup,
  setStateSettings,
  setStateFilter,
  setStatePassChange } from "./menuSlice";

import { signInWithEmailAndPassword, signOut,sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../config/firebaseConfig';

import { getExcludeTags, getIncludeTags, saveTags } from "./filterPageSlice";
import { saveIncludeTags, saveExcludeTags } from "./filterPageSlice";


const MenuPresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const navigateToPlanList = () => {
    navigate("/plan_list");
  };

  const isLoggedIn = useSelector(getIsLoggedIn)
  
  const stateBase = useSelector(getMenuStateBase)
  const stateLogin = useSelector(getMenuStateLogin)
  const stateSignup = useSelector(getMenuStateSignup)
  const stateSettings = useSelector(getMenuStateSettings)
  const stateFilter = useSelector(getMenuStateFilter)
  const statePassChange = useSelector(getMenuStatePassChange)
  
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

//**************LOG IN STUFF**************
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSignOutACB = () => {
      signOut(auth)
      
      .catch((err) => {
        // console.log(err);
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
          // console.log(error);
          alert("Incorrect username or password");
        }
    };

  const handleDeleteAccount = (props) =>{
    console.log("delete account")

    dispatch(deleteUserAsync({email: props.email, password: props.password}))
  }

  const handlePasswordReset = (props)=> {
    console.log("reset password")
sendPasswordResetEmail(auth, props.email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
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

const storedExcludeTags = useSelector(getExcludeTags)
const storedIncludeTags = useSelector(getIncludeTags)

  const handleApplyFilter = (includeTags, excludeTags) => {
    // dispatch(saveIncludeTags(includeTags))
    // dispatch(saveExcludeTags(excludeTags))
    dispatch(saveTags({includeTags: includeTags, excludeTags: excludeTags}))
    navigate("/")
  }

  const handleCancel = () => {
  }


  return (
    <MenuView
      navigateToPlanList={navigateToPlanList}
      isLoggedIn={isLoggedIn}

      stateBase={stateBase}
      stateLogin={stateLogin}
      stateSignup={stateSignup}
      stateSettings={stateSettings}
      stateFilter={stateFilter}
      statePassChange={statePassChange}

      showLogin={showLogin}
      showSignup={showSignup}
      showSettings={showSettings}
      showFilter={showFilter}
      showPassChange={showPassChange}

      hideLogin={hideLogin}
      hideSignup={hideSignup}
      hideSettings={hideSettings}
      hideFilter={hideFilter}
      hidePassChange={hidePassChange}

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
    />
    );
}

export default MenuPresenter