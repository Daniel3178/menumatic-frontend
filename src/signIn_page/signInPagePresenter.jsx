import React from "react";
import SignInPageView from "./signInPageView";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
const SignInPagePresenter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignOutACB = () => {
    signOut(auth)
      .then(() => {
        alert(`You've successfully signed out!`);
        navigate("/");
      })
      .catch((err) => {});
  };
  const handleSignInACB = async (credentials) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      alert(`You logged With email : ${user.user.email}`);
      setEmail("");
      setPassword("");
      navigate(-1);
    } catch (error) {
      alert("Incorrect username or password");
    }
  };

  return (
    <SignInPageView
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      signIn={handleSignInACB}
      signOut={handleSignOutACB}
    />
  );
};

export default SignInPagePresenter;
