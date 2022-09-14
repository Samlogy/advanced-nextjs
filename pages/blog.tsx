import type { NextPage } from "next";
import { useState, useEffect, useRef, useMemo } from "react";

const Blog = () => {
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

  console.log(countRender);

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
    </div>
  );
};

export default Blog;
