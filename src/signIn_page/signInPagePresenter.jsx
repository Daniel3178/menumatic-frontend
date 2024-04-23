import React from 'react'
import SignInPageView from './signInPageView';
import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
const SignInPagePresenter = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignOutACB = () => {
        signOut(auth)
        .then(() => {
          alert(`You've successfully signed out!`);
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
        });

    }
    const handleSignInACB = async (credentials) => {
          try {
            const user = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            );
            alert(
              `You logged With email : ${user.user.email}`
            );
            setEmail("");
            setPassword("");
          } catch (error) {
            console.log(error);
            alert("Incorrect username or password");
          }
      };

  return (
    <SignInPageView
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    signIn ={handleSignInACB}
    signOut ={handleSignOutACB}
    />
  )
}

export default SignInPagePresenter