import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center mt-10'>
        Online-Clothing-Shop
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300'
      >click me</button>
    </>
  )
}

export default App
