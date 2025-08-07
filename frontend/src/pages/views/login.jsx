import React from 'react'
import image from '../../assets/image.png'

const login = () => {
  return (
    <div class="lg:flex lg:items-center lg:justify-content-between lg:mx-auto lg:w-250 lg:gap-15 bg-gray-50 lg:mt-8">
     <img 
  src={image} 
  alt="Your Company" 
  className="hidden md:block mx-auto h-100 w-100 lg:flex" 
/>

      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
   
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Hello There!</h2>
        <p class="mt-4 text-center text-xl/9 font-semiboldbold tracking-tight">welcome😀 you have been missed.please enter your data to log in</p>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" class="space-y-6">
         <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Don't have an account?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"> Sign Up</a>
    </p>
  </div>
</div>






    </div>
   


  )
}

export default login