import React from 'react'
import image from '../../assets/image.png'
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======

import cart from '../../assets/cart.svg'
import google from '../../assets/google.svg'
import facebook from '../../assets/facebook.svg'

>>>>>>> 4-signup-interface-ui

const LoginView = () => {
  return (
    <div className="lg:flex lg:items-center lg:justify-content-between lg:mx-auto lg:w-250  bg-gray-100 lg:mt-8 rounded-4xl ">
      <div className='lg:ml-20 bg-linear-to-t from-cyan-500 to-blue-500 rounded-4xl hidden  mx-auto h-100 w-100 lg:flex '>
        <img src={image} alt="Your Company" className=" " />
      </div>
      
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 lg:w-150 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='flex items-center justify-center gap-x-2'>
            <img src={cart} alt="Your Company" className=" h-10 w-auto bg-blue-600 rounded-full p-2 " />
            <p className='font-bold'>DN spurt</p>
          </div>
          <h2 className="mt-4 text-center text-3xl/9 font-bold tracking-tight text-gray-900">Wellcome back</h2>
          <p className="mt-1 text-center text-sm font-semiboldbold tracking-tight text-gray-400">Please login to your account</p>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form action="#" method="POST" class="space-y-6">
         <div>
          <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" type="email" name="email" required autocomplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
         </div>

         <div>
          <div className="flex items-center justify-between">
           <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
           <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
           </div>
         </div>
        <div className="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs">Sign in</button>
      </div>
    </form>
    <p class="mt-6 text-center text-sm/6 text-gray-400 flex items-center" ><hr className="w-20 border-t-2 border-gray-300 mx-auto" />Or Login With<hr className="w-20 border-t-2 border-gray-300 mx-auto" /></p>
    <div className="mt-6 flex items-center justify-center gap-x-6 lg:justify-center ">
         <button type="submit" className="flex w-full justify-center rounded-md bg-white px-1 py-1.5 text-sm/6 font-semibold text-black  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100 items-center justify-content-center gap-x-2"> <img src={google} className='h-4 w-auto'/> Google</button>
          <button type="submit" className="flex w-full justify-center rounded-md bg-white px-1 py-1.5 text-sm/6 font-semibold text-black  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100 items-center justify-content-center gap-x-2"><img src={facebook} className='h-4 w-auto'/>Facebook</button>
        </div>

    <p class="mt-10 text-center text-sm/6 text-gray-400">
      Don't have an account?
<<<<<<< HEAD
=======

>>>>>>> 4-signup-interface-ui
      {/* <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"> Sign Up</a> */}
      <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
                  Sign Up
      </Link>
<<<<<<< HEAD
=======

>>>>>>> 4-signup-interface-ui
    </p>
  </div>
</div>






    </div>
   


  )
}

export default LoginView;