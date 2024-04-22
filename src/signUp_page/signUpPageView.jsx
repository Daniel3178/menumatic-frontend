import React from 'react'

const SingUpPageView = (props) => {


  return (
    <form className='w-full mt-10 justify-center items-center flex flex-col' onSubmit={props.signUp}>
        <input className='w-40 h-10 border border-black' type='email' placeholder="enter your email" value={props.email} onChange={(e)=> props.setEmail(e.target.value)}></input>
        <input className='w-40 h-10 border border-black' type='password' placeholder="enter your password" value={props.password} onChange={(e)=> props.setPassword(e.target.value)}></input>
        <button className='border border-green-400 rounded mt-4 bg-green-500 w-20' type="submit">Sign Up</button>
    </form>
  )
}

export default SingUpPageView