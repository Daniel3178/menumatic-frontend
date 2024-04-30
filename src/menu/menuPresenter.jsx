import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { getIsLoggedIn, getUserId } from "../signUp_page/userAccountSlice"
import MenuView from './menuView';
import {getMenuState} from "./menuSlice";


const MenuPresenter = () => {
  const menuState = useSelector(getMenuState)
  const dispatch = useDispatch();
  useEffect(() => {
  })



    const handleNavigateToFilterPage = () => {
        navigate("/filterpage-test");
      };
    
      const handleNavigateToPlanList = () => {
        navigate("/plan_list");
      };
    
      const handleLoginView = () => {
        dispatch(showLogIn())
      };



      return (
        <MenuView
          navigateToFilterPage={handleNavigateToFilterPage}
          navigateToPlanList={handleNavigateToPlanList}
          menuState={menuState}
          isLoggedIn={getIsLoggedIn}
        />
      );
}

export default MenuPresenter