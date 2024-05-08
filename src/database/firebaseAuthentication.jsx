import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  signInCurrentUser,
  signOutCurrentUser,
} from "../signUp_page/userAccountSlice";
import {
  searchComplexBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import {
  flushUserData,
  fetchUserShopinglist,
  fetchUserFoodPref,
  setUserFoodPrefState,
} from "../store/menumaticServerAPISlice";
import { getExcludeTags, getIncludeTags } from "../menu/filterPageSlice";
const FirebaseAuthentication = () => {
  const dispatch = useDispatch();
  const excludeIngr = useSelector(getExcludeTags);
  const includeIngr = useSelector(getIncludeTags);

  //TODO: when server is not available, there is an issue with calling spoonacualr.

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User: ", user);
      console.log("AFTER CONST user", user);
      if (user) {
        const { email, uid, emailVerified } = user;
        if (emailVerified) {
          console.log("User verified!");
          dispatch(
            signInCurrentUser({
              email: email,
              userId: uid,
            })
          );
          dispatch(fetchUserShopinglist(user.uid));
          dispatch(fetchUserFoodPref(user.uid));
        } else {
          console.log("User not verified or account not found!");
          dispatch(signOutCurrentUser());
          dispatch(flushUserData());
          dispatch(setUserFoodPrefState("ready"));
          dispatch(
            searchComplexBySpoonacularApiAsync({
              intolerances: excludeIngr,
              diet: includeIngr,
            })
          );
        }
      } else {
        dispatch(setUserFoodPrefState("ready"));
        dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances: excludeIngr,
            diet: includeIngr,
          })
        );
      }
    });
  }, []);
};

export default FirebaseAuthentication;
