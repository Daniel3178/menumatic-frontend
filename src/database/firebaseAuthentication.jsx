import React, { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { signInCurrentUser, signOutCurrentUser } from '../signUp_page/userAccountSlice';
import {flushUserData, fetchUserShopinglist, fetchUserFoodPref} from '../store/menumaticServerAPISlice'
const FirebaseAuthentication = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(
              signInCurrentUser({
                email: user.email,
                userId: user.uid,
              })
            );
             dispatch(fetchUserShopinglist(user.uid))
             dispatch(fetchUserFoodPref(user.uid)) 
            
          } else {
            dispatch(signOutCurrentUser());
            dispatch(flushUserData());
          }
        });
      }, []);
    }

export default FirebaseAuthentication