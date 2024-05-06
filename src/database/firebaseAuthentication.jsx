import React, { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { signInCurrentUser, signOutCurrentUser } from '../signUp_page/userAccountSlice';
import {flushUserData, fetchUserShopinglist, fetchUserFoodPref} from '../store/menumaticServerAPISlice'
const FirebaseAuthentication = () => {

  //TODO: DEPRICATED
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          console.log("User: ", user)
          const {email, uid, emailVerified} = user;

          if (emailVerified) {
            console.log("User verified!");
            dispatch(
              signInCurrentUser({
                email: email,
                userId: uid,
              })
            );
             dispatch(fetchUserShopinglist(user.uid))
             dispatch(fetchUserFoodPref(user.uid)) 
            
          } else {
            console.log("User not verified or account not found!");
            dispatch(signOutCurrentUser());
            dispatch(flushUserData());
          }
        });
      }, []);
    }

export default FirebaseAuthentication