import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className='text-black bg-green-400 rounded-full py-2 px-4 mb-8'>Tailwind Css</h1>
     <Card username="Jyotirmoy Dutta"/>
    </>
  )
}

export default App
