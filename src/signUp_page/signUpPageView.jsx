import React from 'react'

const SingUpPageView = (props) => {

  function validate_password() {
 
    let pass = document.getElementById('pass').value;
    let confirm_pass = document.getElementById('confirm_pass').value;
    if (pass != confirm_pass) {
        document.getElementById('wrong_pass_alert').style.color = 'red';
        document.getElementById('wrong_pass_alert').innerHTML
            = 'Passwords does not match. Try again.';
        document.getElementById('signup').disabled = true;
        document.getElementById('confirm_pass').classList.add('ring-2', 'ring-red-500');
    } else {
        document.getElementById('wrong_pass_alert').style.color = 'green';
        document.getElementById('wrong_pass_alert').innerHTML =
            'Passwords match.';
        document.getElementById('confirm_pass').classList.remove('ring-2', 'ring-red-500');
        document.getElementById('signup').disabled = false;
    }
  }
  

  return (  
  <form className="w-full mt-10 flex justify-center items-center flex-col" onSubmit={props.signUp}>
    
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
      onKeyUp={validate_password}
      id="pass"
      type="password"
      placeholder="Enter password"
      value={props.password}
      onChange={(e) => props.setPassword(e.target.value)}
      required
      minLength="6"
    />

    <input
      className="m-1 p-2 w-64 h-12 border border-gray-300 rounded-md "
      onKeyUp={validate_password}
      id="confirm_pass"
      type="password"
      placeholder="Confirm password"
      required
      minLength="6"
    />

    <span id="wrong_pass_alert"></span>

    <button
      className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      id="signup"
      type="submit"
      disabled
    >
      Sign up
    </button>
    
  </form>

  )
}


export default SingUpPageView