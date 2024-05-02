import React from 'react'

const SignInPageView = (props) => {

  const handleSignInCB = (e) => {
    e.preventDefault();
    props.signIn({ email: props.email, password: props.password });
  };

  return (  
  <form className="w-full mt-10 flex justify-center items-center flex-col" onSubmit={handleSignInCB}>
    <input
      className="m-1 p-2 w-64 h-12 border border-gray-300 rounded-md "
      type="email"
      placeholder="Enter email"
      value={props.email}
      onChange={(e) => props.setEmail(e.target.value)}
      required
    />

    <input
      className="m-1 p-2 w-64 h-12 border border-gray-300 rounded-md "
      id="pass"
      type="password"
      placeholder="Enter password"
      value={props.password}
      onChange={(e) => props.setPassword(e.target.value)}
      required
      minLength="6"
    />

    <span id="wrong_pass_alert"></span>

    <button
      className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      id="signup"
      type="submit"
      
    >
      Sign In
    </button>

    <button onClick={props.signOut} className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed">
      Sign Out
    </button>
    
  </form>

  )
}


export default SignInPageView