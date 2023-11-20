import { useState } from "react"


function App() {
    const [color,setColor] = useState('olive');

  return (
    <>
      <div className="w-full h-screen" style={{backgroundColor: color}}>
        <div className="fixed bottom-12 flex flex-wrap text-2xl justify-center bg-transparent w-full gap-3">

          <button onClick={() => setColor('red')} className="px-4 py-2 rounded-md bg-red-700">Red</button>
          <button onClick={() => setColor('green')} className="px-4 py-2 rounded-md bg-green-700">Green</button>
          <button onClick={() => setColor('blue')} className="px-4 py-2 rounded-md bg-blue-700">Blue</button>
          <button onClick={() => setColor('yellow')} className="px-4 py-2 rounded-md bg-yellow-700">Yellow</button>
          <button onClick={() => setColor('violet')} className="px-4 py-2 rounded-md bg-violet-700">Violet</button>
          <button onClick={() => setColor('olive')} className="px-4 py-2 rounded-md bg-[##808000}">Olive</button>
          <button onClick={() => setColor('grey')} className="px-4 py-2 rounded-md bg-gray-700">Grey</button>
          <button onClick={() => setColor('purple')} className="px-4 py-2 rounded-md bg-purple-700">Purple</button>
        </div>
      </div>
    </>
  )
}

export default App
