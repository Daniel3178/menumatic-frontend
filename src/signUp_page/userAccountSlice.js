import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpAsync = createAsyncThunk(
    "userAccountSlice/signUp",
    async (payload) => {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        return {
          email: userCredentials.user.email,
          userId: userCredentials.user.uid,
        };
      } catch (error) {
        console.log(error.message);
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
      },
    },
    extraReducers: (builder) => {
      builder.addCase(signUpAsync.fulfilled, (state, action) => {
        console.log("extra reducer", action.payload.email, action.payload.userId)
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        console.log(state.email, state.userId);
        alert(
          `You've successfully created an account! \nemail: ${action.payload.email}`
        );
      });
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