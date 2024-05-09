import { createSlice } from "@reduxjs/toolkit";

const menuPage = createSlice({
  name: "menuPage",
  initialState: {
    menuState: {
      base: false,
      login: false,
      signup: false,
      settings: false,
      filter: false,
      passChange: false,
      recommendBtn: false,
      recommendDialog: false,
    },
  },
  reducers: {
    setStateBase: (state, action) => {
      state.menuState.base = action.payload;
    },
    setStateLogin: (state, action) => {
      state.menuState.login = action.payload;
    },
    setStateSignup: (state, action) => {
      state.menuState.signup = action.payload;
    },
    setStateSettings: (state, action) => {
      state.menuState.settings = action.payload;
    },
    setStateFilter: (state, action) => {
      state.menuState.filter = action.payload;
    },
    setStatePassChange: (state, action) => {
      state.menuState.passChange = action.payload;
    },
    setStateRecommendBtn: (state, action) => {
      state.menuState.recommendBtn = action.payload;
    },
    setStateRecommendDialog: (state, action) => {
      state.menuState.recommendDialog = action.payload;
    },
  },
});
export const getMenuStateBase = (state) => state.menu.menuState.base;
export const getMenuStateLogin = (state) => state.menu.menuState.login;
export const getMenuStateSignup = (state) => state.menu.menuState.signup;
export const getMenuStateSettings = (state) => state.menu.menuState.settings;
export const getMenuStateFilter = (state) => state.menu.menuState.filter;
export const getMenuStatePassChange = (state) =>
  state.menu.menuState.passChange;
export const getMenuStateRecommendBtn = (state) =>
  state.menu.menuState.recommendBtn;
export const getMenuStateRecommendDialog = (state) =>
  state.menu.menuState.recommendDialog;

export default menuPage.reducer;
export const {
  menuState,
  setStateBase,
  setStateLogin,
  setStateSignup,
  setStateSettings,
  setStateFilter,
  setStatePassChange,
  setStateRecommendBtn,
  setStateRecommendDialog,
} = menuPage.actions;
