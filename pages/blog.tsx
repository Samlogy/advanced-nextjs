import { useState, useEffect, useRef, useMemo } from "react";

export default function Blog() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // on mount
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    // unmount
    return () => clearTimeout(timer);
  }, []);

  // updated
  useEffect(() => {
    if (count === 3) setCount(0);
  }, [count]);

  // ref
  const countRender = useRef<any>();
  const [inputValue, setInputValue] = useState("");

  const focusInput = () => {
    countRender.current.focus();
  };

  useEffect(() => {
    countRender.current = countRender.current + 1;
  });

  //console.log(countRender);

  // useMemo
  function expensiveCalculation(num: number) {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  }
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  /// useCallBack

  return (
    <div>
      <h1>useEffect</h1>
      <button onClick={() => setCount(count + 1)}> + </button>
      <span> {count} </span>
      <button onClick={() => setCount(count - 1)}> - </button>

      <h1>useRef</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span>Render Count: {countRender.current}</span>

      <h1>useMemo</h1>
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
}
