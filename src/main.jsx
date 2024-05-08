import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import FirebaseAuthentication from "./database/firebaseAuthentication.jsx";
import MenumaticDatabase from "./database/menumaticDatabase.jsx";
import LocalStorage from "./database/localStorage.js";
import "./index.css";

// The root method which instantiates the web application.
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <LocalStorage/>
      <App />
      <FirebaseAuthentication/>
      <MenumaticDatabase/>
    </Provider>
  // </React.StrictMode>
);
