import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);

  const [numbersAllowed, setNumbersAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //  Password Ref

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTWVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "0123456789";

    if (charAllowed) str += "~!@#$%^&*-_+=[]{}`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  const copyPsswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[numbersAllowed,charAllowed,setPassword,length])

  return (
    <>
      <div className="w-5/6 max-w-2xl mx-auto shadow-xl px-10 py-8 rounded-lg bg-gray-700 mt-10">
        <h1 className="text-4xl text-white text-center mt-3 mb-8">
          Password Generator
        </h1>
        <div className="flex shadow-md overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3 rounded-lg"
            ref={passwordRef}
          />

          <button className="bg-blue-600 py-2 px-4 ml-2 rounded-lg" onClick={copyPsswordToClipBoard}>
            Copy
          </button>
        </div>

        <div className="flex text-lg gap-x-2">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-semibold text-orange-600">
              Length: {length}
            </label>
          </div>

          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-orange-600">
              Numbers
            </label>
          </div>

          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-orange-600">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
