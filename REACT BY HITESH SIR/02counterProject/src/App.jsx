import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // let counter = 15;

  let [counter, setCounter] = useState(5);

  const addValue = () => {
    // counter++;
    setCounter(prevCoounter => prevCoounter + 1);
    setCounter(prevCoounter => prevCoounter + 1);
    setCounter(prevCoounter => prevCoounter + 1);
    setCounter(prevCoounter => prevCoounter + 1);
  };

  const decreValue = () => {
    if (counter < 1) {
      return;
    }

    counter--;
    setCounter(counter);
  };

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add Value: {counter}</button>
      <br />
      <button onClick={decreValue}>Decrease Value: {counter}</button>
    </>
  );
}

export default App;
