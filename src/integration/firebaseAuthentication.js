import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useDispatch } from "react-redux";
import {
  signInCurrentUser,
  signOutCurrentUser,
} from "../menu/userAccountSlice";
import { saveTags } from "../menu/filterPageSlice";
import { fetchLocalFoodPref } from "./localStorage";

const FirebaseAuthentication = () => {
  const dispatch = useDispatch();

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
        } else {
          dispatch(signOutCurrentUser());
          const { excludeTags, includeTags, mealsInPlan } =
            fetchLocalFoodPref();
          dispatch(saveTags({ excludeTags, includeTags, mealsInPlan }));
        }
      } else {
        const { excludeTags, includeTags, mealsInPlan } = fetchLocalFoodPref();
        dispatch(saveTags({ excludeTags, includeTags, mealsInPlan }));
      }
    });
  }, []);
};

export default FirebaseAuthentication;
