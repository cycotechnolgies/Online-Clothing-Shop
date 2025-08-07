import { useState } from 'react'
import './App.css'
import Footer from './components/Footer.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Footer />
    </>
  )
}

export default App
