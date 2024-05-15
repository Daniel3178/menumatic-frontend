import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const deleteUserAsync = createAsyncThunk(
  "userAccountSlice/deleteUser",
  async (payload) => {
    try {
      const { currentUser } = auth;
      const credentials = EmailAuthProvider.credential(
        payload.email,
        payload.password
      );
      reauthenticateWithCredential(currentUser, credentials).then(async () => {
        await signOut(auth)
          .then(async () => {
            await deleteUser(currentUser)
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                // An error ocurred
                // ...
              });
          })
          .catch((error) => {});
      });
    } catch (error) {
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "userAccountSlice/signUp",
  async (payload) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      ).then(async (userCredential) => {
        const user = userCredential.user;
        await sendEmailVerification(user).then(() => {
          signOut(auth)
            .then(() => {
              navigate("/");
            })
            .catch((err) => {});
        });
        alert(
          "Verification email sent! Please verify your email before logging in!"
        );
      });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("Email already in use! Try another one!");
      } else {
        alert("Something went wrong! Try again!");
      }
    }
  }
);

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    username: null,
    email: null,
    userId: null,
    isLoggedIn: false,
    status: "",
  },
  reducers: {
    signInCurrentUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.status = "Signed in";
    },
    signOutCurrentUser(state, action) {
      state.username = null;
      state.email = null;
      state.userId = null;
      state.isLoggedIn = false;
      state.status = "Signed out";

      localStorage.removeItem("exclude-tags");
      localStorage.removeItem("include-tags");
      localStorage.removeItem("meals-in-plan");
      localStorage.removeItem("userShoplistData");
    },
  },
  
});

export const { signInCurrentUser, signOutCurrentUser } =
  userAccountSlice.actions;

export default userAccountSlice.reducer;
//getters
export const getUsername = (state) => state.userAccount.username;
export const getUserEmail = (state) => state.userAccount.email;
export const getUserId = (state) => state.userAccount.userId;
export const getIsLoggedIn = (state) => state.userAccount.isLoggedIn;
