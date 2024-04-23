import { signUpAsync } from "./userAccountSlice";
import SingUpPageView from "./signUpPageView";
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SignUpPagePresenter = () => {
 const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUpAsync({ email, password }));
        setEmail("");
        setPassword("");
    }

  return (
    <SingUpPageView
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    signUp ={handleSignUp}
    />
  )
}

export default SignUpPagePresenter