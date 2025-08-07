import { useState } from 'react'
import './App.css'
import HomeView from './pages/views/HomeView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomeView />
    </>
  )
}

export default App
