import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import FirebaseAuthentication from "./integration/firebaseAuthentication.js";
import MenumaticListeners from "./integration/menumaticListeners.js";
import "./index.css";

// The root method which instantiates the web application.
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <FirebaseAuthentication />
    <MenumaticListeners />
  </Provider>
  // </React.StrictMode>
);
