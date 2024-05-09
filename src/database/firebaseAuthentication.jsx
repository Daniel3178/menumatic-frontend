import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  signInCurrentUser,
  signOutCurrentUser,
} from "../signUp_page/userAccountSlice";
import { searchComplexBySpoonacularApiAsync } from "../store/spoonacularAPISlice";
import {
  fetchUserShopinglist,
  fetchUserFoodPref,
} from "../store/menumaticServerAPISlice";
import { getExcludeTags, getIncludeTags } from "../menu/filterPageSlice";
const FirebaseAuthentication = () => {
  const dispatch = useDispatch();
  const excludeIngr = useSelector(getExcludeTags);
  const includeIngr = useSelector(getIncludeTags);

  //TODO: when server is not available, there is an issue with calling spoonacualr.

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, emailVerified } = user;
        if (emailVerified) {
          dispatch(
            signInCurrentUser({
              email: email,
              userId: uid,
            })
          );
          dispatch(fetchUserShopinglist(user.uid));
          dispatch(fetchUserFoodPref(user.uid));
        } else {
          dispatch(signOutCurrentUser());
          dispatch(
            searchComplexBySpoonacularApiAsync({
              intolerances: excludeIngr,
              diet: includeIngr,
            })
          );
        }
      } else {
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
